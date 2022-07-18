import s from './SuccessfulRegistrationPage.module.scss'

export const SuccessfulRegistrationPage = () => {
	
	return (
		<div className={s.container}>
			<h2 className={s.title}>
				Thank You!
			</h2>
			<h3 className={s.second_title}>
				you registered!
			</h3>
			<div className={s.login}>
				Have an account?{'\u00A0'}
				<a href={''} className={s.link}>Login</a>
			</div>
		</div>
	)
}