import {v1} from 'uuid'
import {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import {createUserTC, UserType} from '../../state/registration-reducer'
import {AppRootStateType, useTypedDispatch} from '../../state/store'
import {useSelector} from 'react-redux'
import s from './RegistrationForm.module.scss'

export const RegistartionForm = () => {

	const dispatch = useTypedDispatch()

	const error = useSelector<AppRootStateType, string>(state => state.registration.error)
	const isLoading = useSelector<AppRootStateType, boolean>(state => state.registration.isLoading)
	/*const success = useSelector<AppRootStateType, boolean>(state => state.loading.isSuccess)*/

	const [inputValues, setInputValue] = useState<UserType>({
		id: v1(),
		firstName: '',
		lastName: '',
		email: '',
		nationality: '',
		birthDate: '',
		gender: '',
		password: ''
	})

	const [validation, setValidation] = useState<ValidationType>({
		firstAndLastName: '',
		email: '',
		phone: '',
		birthDate: '',
		message: '',
	})

	//const [disable, setDisable] = useState<boolean>(false)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target
		setInputValue({...inputValues, [name]: value})
	}

	const checkValidation = () => {
		let errors = validation

		//name validation
		const nameCond = /^([A-Z]{3,30})\s([A-Z]{3,30})$/i
		if (!inputValues.firstName.trim()) {
			errors.firstAndLastName = 'You need to enter your first and last name'
		} else if (!nameCond.test(inputValues.firstName)) {
			errors.firstAndLastName = 'First and last names must contain from 3 to 30 Latin letters'
		} else {
			errors.firstAndLastName = ''
		}

		//email validation
		const emailCond = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i
		if (!inputValues.email.trim()) {
			errors.email = 'Email is required'
		} else if (!inputValues.email.match(emailCond)) {
			errors.email = 'Please enter a valid email address'
		} else {
			errors.email = ''
		}

		//message validation
		if (!inputValues.password.trim()) {
			errors.message = 'Message is required'
		} else if (inputValues.password.length < 10) {
			errors.message = 'Message must be longer than 10 characters'
		} else if (inputValues.password.length > 300) {
			errors.message = 'Message must be shorter than 300 characters'
		} else {
			errors.message = ''
		}
		setValidation(errors)
	}

	/*	const newForm = {
			id: v1(),
			firstAndLastName: '',
			email: '',
			phone: '',
			birthDate: '',
			message: '',
		}*/
	useEffect(() => {
		checkValidation()
		if (isLoading
			|| error
			|| validation.message
			|| validation.email
			|| validation.firstAndLastName
			|| validation.phone) {
			//setDisable(true)
		} //else setDisable(false)
		/*if (success) {
			const timer = setTimeout(() => {
				//dispatch(successAC(false))
				dispatch(loading(false))
				setInputValue(newMessage)
			}, 1500)
			return () => clearTimeout(timer)
		}*/
	}, [, inputValues.email, isLoading, error,
		validation.message, validation.email, validation.firstAndLastName, validation.phone
	])

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		dispatch(createUserTC(inputValues))
		e.preventDefault()
	}

	return (
		<>
			<div>
				Sign up
			</div>
			<h2>New user?</h2>
			<span>Use the form below to create your account.</span>
			<form
				className={s.form}
				id="RegistrationForm"
				onSubmit={handleSubmit}
			>
				<div className={s.box}>
                    <input
											className={s.name}
											placeholder="First Name"
											name="firstName"
											onChange={(e) => handleChange(e)}
											value={inputValues.firstName}
											autoFocus
										/>
					{validation.firstAndLastName && <p className={s.error}>{validation.firstAndLastName}</p>}
				</div>

				<div className={s.box}>
                    <input
											className={s.name}
											placeholder="Last Name"
											name="lastName"
											onChange={(e) => handleChange(e)}
											value={inputValues.lastName}
										/>
					{validation.firstAndLastName && <p className={s.error}>{validation.firstAndLastName}</p>}
				</div>

				<div className={s.box}>
					<select
						className={s.name}
						placeholder="Nationality"
						name="nationality"
						/*onChange={(e) => handleChange(e)}
						value={inputValues.lastName}*/
					/>
					{validation.firstAndLastName && <p className={s.error}>{validation.firstAndLastName}</p>}
				</div>

				<div className={s.box}>
					<input
						className={s.input}
						type={'email'}
						placeholder="email"
						name="email"
						onChange={(e) => handleChange(e)}
						value={inputValues.email}
						formNoValidate
					/>
					{validation.email && <p className={s.error}>{validation.email}</p>}
				</div>


				<div className={s.box}>
					<input
						className={s.input}
						type={'text'}
						placeholder="Date of Birth"
						onFocus={(e) => (e.target.type = 'date')}
						onBlur={(e) => (e.target.type = 'text')}
						name="birthDate"
						onChange={(e) => handleChange(e)}
						value={inputValues.birthDate}
					/>
					{validation.birthDate && <p className={s.error}>{validation.birthDate}</p>}
				</div>

				<div className={s.box}>
					<input
						className={s.input}
						type={'radio'}
						placeholder="Gender"
						name="gender"
	/*					onChange={(e) => handleChange(e)}
						value={inputValues.birthDate}*/
					/>
					{validation.birthDate && <p className={s.error}>{validation.birthDate}</p>}
				</div>

				<div className={s.box}>
					<input
						className={s.input}
						type={'password'}
						placeholder="Password"
						name="password"
						onChange={(e) => handleChange(e)}
						value={inputValues.email}
					/>
					{validation.email && <p className={s.error}>{validation.email}</p>}
				</div>

				<div className={s.box}>
					<input
						className={s.input}
						type={'password'}
						placeholder="Confirm password"
						name="confirmPassword"
						onChange={(e) => handleChange(e)}
						value={inputValues.email}
					/>
					{validation.email && <p className={s.error}>{validation.email}</p>}
				</div>

				<div>
					Have an account?
					<a href="">Login</a>
				</div>
				<button type="submit" className={s.submit}>
					Complete Signup
				</button>
			</form>
		</>
	)
}

//types
type ValidationType = {
	firstAndLastName: string,
	email: string,
	phone: string,
	birthDate: string,
	message: string,
}