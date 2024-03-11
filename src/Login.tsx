import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../convex/_generated/api";
import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './login.css'

export default function Login() {
	const [regis, setRegis] = useState(true)
	const createUser = useMutation(api.users.create)
	const authUser = useAction(api.users.auth)
	const navigate = useNavigate()

	const onSignUpSubmit = async () => {
		const name = document.getElementById('sign_up_name').value
		const email = document.getElementById('sign_up_email').value
		const password = document.getElementById('sign_up_password').value
		const repassword = document.getElementById('sign_up_repassword').value
		console.log({name, email, password, repassword})
		if (password != repassword) return
		await createUser({name, email, password})
		setRegis(true)
	}

	const onLoginSubmit = async () => {
		const email = document.getElementById('login_email').value
		const password = document.getElementById('login_password').value
		const res = await authUser({email, password})
		if (!res) {
			console.log('fail')
			return;
		}
		sessionStorage.setItem("user", JSON.stringify(res))
		return navigate('/home')
	}

	return (
		<>
			{regis ? (
				<div className="auth_box">
					<input type="mail" placeholder="Email" id="login_email" />
					<input type="password" placeholder="Password" id="login_password" />
					<button className="auth_submit" onClick={onLoginSubmit}>Login</button>
					<button className="auth_submit" onClick={() => setRegis(false)}>Regis</button>
				</div>
			) : (
				<div className="auth_box">
					<input type="text" placeholder="name" id="sign_up_name" />
					<input type="mail" placeholder="Email" id="sign_up_email" />
					<input type="password" placeholder="Password" id="sign_up_password"/>
					<input type="password" placeholder="Reconfirm Password" id="sign_up_repassword"/>
					<button className="auth_submit"
						onClick={onSignUpSubmit}>
						Sign up
					</button>
				</div>
			)}
		</>
	)
}