import {useState} from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {ChangeEvent, useState, useRef} from "react";
import axios from "axios";

interface TextField {
	name: string,
	label: string,
	required: boolean
}
interface FormProps {
	textFields?: TextField[],
	submitText?: string
}

const Form = ({textFields, submitText}: FormProps) => {
	const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const params = {
			email,
			name: username,
			password: password.current.value,
			confirmPassword: confirmPassword.current.value
		};
		console.log({params});
		const response = await axios.post("http://localhost:5000/api/auth/register", params)
		const {data, status} = response;
		const {error} = data;
		if (error) {
			alert("invalid data");
			return;
		}
		console.log({data, status});
	}
	return (
		<form onSubmit={handleSubmit}>
			<Stack>
				{/* <TextField label="Email" required onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
				{!isLogin && <TextField label="Username" required onChange={(e: ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)} />}
				<TextField label="Password" required defaultValue="" inputRef={password} />
				{!isLogin && <TextField label="Confirm Password" required defaultValue="" inputRef={confirmPassword} />} */}
				{
					textFields?.map(({label, required, defaultValue, ref}: TextField, index: number) => (
						<TextField key={index} label={label} required={required} defaultValue={defaultValue} ref={ref} />
					))
				}
				<Button type="submit">
					{submitText || "Submit"}
				</Button>
			</Stack>
		</form>
	);
}

export default Form;