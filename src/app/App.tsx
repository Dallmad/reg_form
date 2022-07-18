import React from 'react'
import {RegistrationForm} from '../features/RegistrationForm/RegistartionForm'
import s from './App.module.scss'
import {SuccessfulRegistrationPage} from '../features/RegistrationForm/SuccessfulRegistartionPage'
import {useSelector} from 'react-redux'
import {AppRootStateType} from '../state/store'

export const App = () => {

	const isRegistration = useSelector<AppRootStateType, boolean>(state => state.registration.isRegistration)

	return (
		<div className={s.image}>
			<div className={s.app}>
				<div className={s.container}>
					<h1 className={s.title}>Sign up</h1>
				</div>
				{!isRegistration &&
					<div className={s.box_registration}>
						<RegistrationForm/>
					</div>
				}
				{isRegistration &&
					<div>
						<SuccessfulRegistrationPage/>
					</div>
				}
			</div>
		</div>
	)
}

