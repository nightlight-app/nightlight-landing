import React, { useState } from "react";
const NOTION_KEY = import.meta.env.VITE_NOTION_KEY;
const NOTION_DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID;

const EmailInput = () => {
	const [email, setEmail] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [success, setSuccess] = useState<string>("");

	const validateEmail = (email: string) => {
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
				"https://nightlight-backend.zinean00.workers.dev/cors/https://api.notion.com/v1/pages",
				{
					method: "POST",
					mode: "cors",
					headers: {
						Authorization: `Bearer ${NOTION_KEY}`,
						"Content-Type": "application/json",
						"Notion-Version": "2022-06-28",
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
		<form onSubmit={(e) => handleSubmit(e)}>
			<input
				type="text"
				name="email"
				onChange={(e) => setEmail(e.target.value)}
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
