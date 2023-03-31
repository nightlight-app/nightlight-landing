import React, { useState } from "react";

import "./EmailInput.css";

const CORS_PROXY_URL = import.meta.env.VITE_CORS_PROXY_URL;
const NOTION_API = import.meta.env.VITE_NOTION_API;
const NOTION_KEY = import.meta.env.VITE_NOTION_KEY;
const NOTION_DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID;

const EmailInput = () => {
	const [email, setEmail] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	  };

	const validateEmail = (email: string): RegExpMatchArray | null => {
		return String(email)
			.toLowerCase()
			.match(
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validateEmail(email)) {
			setError("Please enter a valid email address");
			return;
		} else setError("");

		try {
			/**
			 * Makes a POST request to the Notion API via CORS proxy configured by Cloudflare Workers
			 * This is because the Notion API does not support CORS
			 * See issue: https://github.com/makenotion/notion-sdk-js/issues/96
			 */
			await fetch(
				CORS_PROXY_URL + NOTION_API,
				{
					method: "POST",
					mode: "cors",
					headers: {
						Authorization: `Bearer ${NOTION_KEY}`,
						"Content-Type": "application/json",
						"Notion-Version": "2022-06-28",
						"Allow": "POST",
					},
					body: JSON.stringify({
						parent: {
							database_id: NOTION_DATABASE_ID,
						},
						properties: {
							// Save email
							Email: {
								title: [
									{
										text: {
											content: email,
										},
									},
								],
							},
							// Save date
							Date: {
								date: {
									start: new Date().toISOString(),
								},
							},
						},
					}),
				}
			);
		} catch (error) {
			console.log(error);
		}
		setSuccess("Thank you for signing up!");
	};

	return (
		<form id='signup-form' onSubmit={handleSubmit}>
			<input
				type="email"
				placeholder="Email"
				onChange={handleEmailChange}
				defaultValue={email}
			/>
			<button type="submit">Submit</button>

			{/* Show error message */}
			{error && <p>{error}</p>}

			{/* Only show success message if no error and success */}
			{!error && success && <p>{success}</p>}
		</form>
	);
};

export default EmailInput;
