import {v1} from 'uuid'
import {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import {createUserTC, UserType} from '../../state/registration-reducer'
import {AppRootStateType, useTypedDispatch} from '../../state/store'
import {useSelector} from 'react-redux'
import s from './RegistrationForm.module.scss'
import React from 'react';
import {nameCondition} from '../../common/RegEx/nameCondition'
import {emailCondition} from '../../common/RegEx/emailCondition'
import {passwordCondition} from '../../common/RegEx/passwordCondition'


export const RegistrationForm = () => {

	const dispatch = useTypedDispatch()

	const error = useSelector<AppRootStateType, string>(state => state.registration.error)
	const isLoading = useSelector<AppRootStateType, boolean>(state => state.registration.isLoading)

	const genderArr = ['Male', 'Female']
	const nationalityDate = ['American', 'Belarus', 'Frenchman']
	

	const [inputValues, setInputValue] = useState<InputValuesType>({
		id: v1(),
		firstName: '',
		lastName: '',
		email: '',
		nationality: 'American',
		password: '',
		birthDate: '',
		confirmPassword: ''
	})
	const [gender, setGender] = useState<string>(genderArr[0])
	const [isErrorOnClick, setIsErrorOnClick] = useState<boolean>(false)
	const [validation, setValidation] = useState<ValidationType>({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	})
	//console.log('isErrorOnClick:'+isErrorOnClick)
	console.log(inputValues)

	const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
		const {name, value} = e.target
		setInputValue({...inputValues, [name]: value})
		//checkValidation()
	}

	const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
		setGender(e.currentTarget.value)
	}

	const checkValidation = () => {
		let errors = validation

		//first name validation
		if (inputValues.firstName!=='') {
			if (!inputValues.firstName.trim()) {
				errors.firstName = 'You need to enter your first name'
			} else if (!nameCondition.test(inputValues.firstName)) {
				errors.firstName = 'First name should contain from 2 letters'
			} else errors.firstName = ''
		} else errors.firstName = ''
		

		//last name validation
		if (inputValues.lastName) {
			if (!inputValues.lastName.trim()) {
				errors.lastName = 'You need to enter your last name'
			} else if (!nameCondition.test(inputValues.lastName)) {
				errors.lastName = 'Last name should contain from 2 letters'
			} else errors.lastName = ''
		} else errors.lastName = ''
		

		//email validation
		if (inputValues.email !== '') {
			if (!inputValues.email.trim()) {
				errors.email = 'Email is required'
			} else if (!inputValues.email.match(emailCondition)) {
				errors.email = 'Please enter a valid email address'
			} else errors.email = ''
		} else errors.email = ''

		//password validation
		if (inputValues.password !== '') {
			if (!inputValues.password.trim()) {
				errors.password = 'Password is required'
			} else if (!inputValues.password.match(passwordCondition)) {
				errors.password = 'Password should consist of A-Z,a-z,0-9'
			} else if (inputValues.password.length < 8) {
				errors.password = 'Password should contain from 8 characters'
			} else errors.password = ''
		} else errors.password = ''

		//confirm password validation
		if (inputValues.password !== ''&& inputValues.confirmPassword!== '') {
			if (inputValues.password !== inputValues.confirmPassword) {
				errors.password = `Passwords don't match`
			} else {
				errors.password = ''
			}
		}
		setValidation(errors)
	}

	useEffect(() => {
		checkValidation()
		if (isLoading
			|| error
			|| validation.password
			|| validation.email
			|| validation.firstName
			|| validation.lastName
			|| !inputValues.firstName
			|| !inputValues.lastName
			|| !inputValues.email
			|| !inputValues.password
		) {
			setIsErrorOnClick(true)
		} else setIsErrorOnClick(false)
	}, [isLoading,error,validation,inputValues])

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		checkValidation()
		if (!isErrorOnClick) {
			dispatch(createUserTC(inputValues))
			e.preventDefault()
			e.currentTarget.reset()
		} else checkValidation()
	}
	
	const finalClassnameEmail = `${validation.email && s.error} ${inputValues.email.match(emailCondition) && s.valid_email}`
	
	return (
		<div className={s.container}>
			<h2 className={s.title}>New user?</h2>
			<h3 className={s.second_title}>Use the form below to create your account.</h3>
			<form
				className={s.form}
				id="RegistrationForm"
				onSubmit={handleSubmit}
			>

				<div className={s.box}>
					<h4>First Name</h4>
					<input
						className={validation.firstName && s.error}
						name="firstName"
						onChange={(e) => handleChange(e)}
						value={inputValues.firstName}
						autoFocus
						onBlur={() => checkValidation()}
					/>
					{validation.firstName && <span className={s.error_text}>
						{validation.firstName}
					</span>}
				</div>

				<div className={s.box}>
					<h4>Last Name</h4>
					<input
						className={validation.lastName && s.error}
						name="lastName"
						onChange={(e) => handleChange(e)}
						value={inputValues.lastName}
						onBlur={() => checkValidation()}
					/>
					{validation.lastName && <span className={s.error_text}>
						{validation.lastName}
					</span>}
				</div>

				<div className={s.box}>
					<h4>Nationality</h4>
					<select
						className={s.select_nationality}
						name="nationality"
						onChange={(e) => handleChange(e)}
					>{nationalityDate.map((o, i) => (<option key={o + i} value={o}>{o}</option>))}
					</select>
				</div>

				<div className={s.box}>
					<h4>E-mail</h4>
					<input
						className={finalClassnameEmail}
						type={'email'}
						name="email"
						onChange={(e) => handleChange(e)}
						value={inputValues.email}
						formNoValidate
						onBlur={() => checkValidation()}
					/>
					{validation.email && <span className={s.error_text}>
						{validation.email}
					</span>}
				</div>


				<div className={s.box}>
					<h4>Date of Birth</h4>
					<div className={s.box_date}>
						<select
							className={s.select_date_day}
							name="day"
							onChange={(e) => handleChange(e)}
						>
							<option>21</option>
							<option>03</option>
						</select>

						<select
							className={s.select_date_month}
							name="month"
							onChange={(e) => handleChange(e)}
						>
							<option>December</option>
							<option>August</option>
						</select>

						<select
							className={s.select_date_year}
							name="year"
							onChange={(e) => handleChange(e)}
						>
							<option>1995</option>
							<option>1987</option>
						</select>
					</div>
				</div>

				<div className={s.box}>
					<h4>Gender</h4>
					<div className={s.box_gender}>
						{genderArr.map((o, i) => (
							<label key={i} className={s.box_gender_radio}>

								<input
									className={s.input_gender}
									type={'radio'}
									name="gender"
									checked={o === gender}
									value={o}
									onChange={onChangeRadio}
								/>
								<span className={s.gender_span}>{o}</span>
							</label>))}
					</div>
				</div>

				<div className={s.box}>
					<h4>Password</h4>
					<input
						className={validation.password ? s.error_password: s.input_password}
						type={'text'}
						name="password"
						onChange={(e) => handleChange(e)}
						value={inputValues.password}
						onBlurCapture={() => checkValidation()}
					/>
					{validation.password && <span className={s.error_text}>
						{validation.password}
					</span>}
				</div>

				<div className={s.box}>
					<h4>Confirm Password</h4>
					<input
						className={s.input_password}
						type={'text'}
						name="confirmPassword"
						onChange={(e) => handleChange(e)}
						value={inputValues.confirmPassword}
					/>
				</div>

				<div className={s.login}>
					Have an account?{'\u00A0'}
					<a href={''} className={s.link}>Login</a>
				</div>
				<button type="submit" className={!isLoading ? s.submit: s.loading} disabled={!!error}>
					Complete Signup
				</button>
			</form>
		</div>
	)
}

//types
type InputValuesType = UserType & {
	confirmPassword: string
}
type ValidationType = {
	firstName: string
	lastName: string
	email: string
	password: string
}
