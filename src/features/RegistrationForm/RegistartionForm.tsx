import {v1} from 'uuid'
import {ChangeEvent, FormEvent, useEffect, useState} from 'react'
import {createUserTC, UserType} from '../../state/registration-reducer'
import {AppRootStateType, useTypedDispatch} from '../../state/store'
import {useSelector} from 'react-redux'
import s from './RegistrationForm.module.scss'

export const RegistrationForm = () => {

	const dispatch = useTypedDispatch()

	const error = useSelector<AppRootStateType, string>(state => state.registration.error)
	const isLoading = useSelector<AppRootStateType, boolean>(state => state.registration.isLoading)

	const [inputValues, setInputValue] = useState<UserType>({
		id: v1(),
		firstName: '',
		lastName: '',
		email: '',
		nationality: 'American',
		birthDate: '',
		password: ''
	})
	//console.log(inputValues)

	const genderArr = ['Male', 'Female']
	const selectDate = ['American', 'Belarus', 'Frenchman']

	const [gender, setGender] = useState<string>(genderArr[0])

	const [validation, setValidation] = useState<ValidationType>({
		firstAndLastName: '',
		email: '',
		phone: '',
		birthDate: '',
		message: '',
	})

	const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
		const {name, value} = e.target
		setInputValue({...inputValues, [name]: value})
	}
	const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
		setGender(e.currentTarget.value)
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
		//setValidation(errors)
	}

	useEffect(() => {
		//checkValidation()
		if (isLoading
			|| error
			|| validation.message
			|| validation.email
			|| validation.firstAndLastName
			|| validation.phone) {
		}
	}, [, inputValues.email, isLoading, error,
		validation.message, validation.email, validation.firstAndLastName, validation.phone
	])

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		dispatch(createUserTC(inputValues))
		e.preventDefault()
	}

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
						className={s.name}
						name="firstName"
						onChange={(e) => handleChange(e)}
						value={inputValues.firstName}
						autoFocus
					/>
					{validation.firstAndLastName && <p className={s.error}>{validation.firstAndLastName}</p>}
				</div>

				<div className={s.box}>
					<h4>Last Name</h4>
					<input
						className={s.name}
						name="lastName"
						onChange={(e) => handleChange(e)}
						value={inputValues.lastName}
					/>
					{validation.firstAndLastName && <p className={s.error}>{validation.firstAndLastName}</p>}
				</div>

				<div className={s.box}>
					<h4>Nationality</h4>
					<select
						className={s.select}
						name="nationality"
						onChange={(e) => handleChange(e)}
					>{selectDate.map((o, i) => (<option key={o + i} value={o}>{o}</option>))}</select>
				</div>

				<div className={s.box}>
					<h4>E-mail</h4>
					<input
						className={s.input}
						type={'email'}
						name="email"
						onChange={(e) => handleChange(e)}
						value={inputValues.email}
						formNoValidate
					/>
					{validation.email && <p className={s.error}>{validation.email}</p>}
				</div>


				<div className={s.box}>
					<h4>Date of Birth</h4>
					<input
						className={s.input}
						type={'text'}
						onFocus={(e) => (e.target.type = 'date')}
						onBlur={(e) => (e.target.type = 'text')}
						name="birthDate"
						onChange={(e) => handleChange(e)}
						value={inputValues.birthDate}
					/>
					{validation.birthDate && <p className={s.error}>{validation.birthDate}</p>}
				</div>

				<div className={s.box}>
					<h4>Gender</h4>
					<div className={s.box_gender}>
						{genderArr.map((o, i) => (
							<label key={i} className={s.box_gender_radio}>

								<input
									className={s.input}
									type={'radio'}
									name="gender"
									checked={o === gender}
									value={o}
									onChange={onChangeRadio}
								/>
								{o}
							</label>))}
					</div>
					</div>

				<div className={s.box}>
					<h4>Password</h4>
					<input
						className={s.input}
						type={'password'}
						name="password"
						onChange={(e) => handleChange(e)}
						value={inputValues.password}
					/>
					{validation.email && <p className={s.error}>{validation.email}</p>}
				</div>

				<div className={s.box}>
					<h4>Confirm password</h4>
					<input
						className={s.input}
						type={'password'}
						name="confirmPassword"
						onChange={(e) => handleChange(e)}
						value={inputValues.email}
					/>
					{validation.email && <p className={s.error}>{validation.email}</p>}
				</div>

				<div className={s.login}>
					Have an account?
					<a className={s.link}> Login</a>
				</div>
				<button type="submit" className={s.submit}>
					Complete Signup
				</button>
			</form>
		</div>
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