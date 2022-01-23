import React from 'react';

const Darkmodebtn = () => {


	function darkMode() {
		if (document.querySelector('.darkModeInput').checked==true) {
			document.querySelector('body').classList.add('darkMode');
			localStorage.setitem('mode', 'dark');
		}
		else if (document.querySelector('.darkModeInput').checked==false) {
			document.querySelector('body').classList.remove('darkMode').classList.add('lightMode');
			localStorage.setitem('mode', 'light');
		}
	}

	return (
		<div>
			<label>Dark mode<input className='darkModeInput' type='checkbox' onChange={() => {darkMode()}}></input></label>
		</div>
	);
}

export default Darkmodebtn;
