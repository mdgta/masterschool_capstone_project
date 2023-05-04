import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {ChangeEvent, useState, useRef} from "react";
import axios from "axios";

const LoginForm = () => {
	const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const params = {
			email,
			password: password.current.value
		};
		console.log({params});
		const response = await axios.post("http://localhost:5000/api/auth/login", params)
		const {data, status} = response;
		const {error} = data;
		if (error) {
			alert("invalid data");
			return;
		}
		console.log({data, status});
	}
	const [email, setEmail] = useState("");
	const password = useRef({value: ""});
	return (
		<form onSubmit={handleSubmit}>
			<Stack>
				<TextField
					label="Email"
					required
					onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
				<TextField
					label="Password"
					required
					defaultValue={""}
					inputRef={password} />
				<Button type="submit">
					Login
				</Button>
			</Stack>
		</form>
	);
}

export default LoginForm;