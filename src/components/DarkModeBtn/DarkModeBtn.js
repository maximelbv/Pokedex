import React from 'react';
import './DarkModeBtn.scss';

const Darkmodebtn = () => {

	let clickedClass = 'clicked';
	const body = document.body;
	const lightTheme = 'lightTheme';
	const darkTheme = 'darkTheme';
	let theme;

	if (localStorage) {
		theme = localStorage.getItem('theme');
	}

	if (theme === lightTheme || theme === darkTheme) {
		body.classList.add(theme);
	} else {
		body.classList.add(lightTheme);
	}

	const switchTheme = (e) => {
		if (theme === darkTheme) {
			body.classList.replace(darkTheme, lightTheme);
			e.target.classList.remove(clickedClass);
			localStorage.setItem('theme', 'lightTheme');
			theme = lightTheme;
		} else {
			body.classList.replace(lightTheme, darkTheme);
			e.target.classList.add(clickedClass);
			localStorage.setItem('theme', 'darkTheme');
			theme = darkTheme;
		}
	}

	return (
		<button 
			className={theme === 'darkTheme' ? clickedClass : ''}
			id='DarkModeBtn'
			onClick={(e) => {switchTheme(e)}}>
		</button>
	);
}

export default Darkmodebtn;
