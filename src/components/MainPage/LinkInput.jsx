import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';

const LinkInput = function () {
	const { request } = useHttp();
	const [link, setLink] = useState('');
	const [input, setInput] = useState('');
	const [notify, setNotify] = useState('');
	const auth = useContext(AuthContext);

	const changeHandler = (evt) => {
		setLink(evt.target.value);
		setInput(evt.target.value);
	};

	const clickHandler = async () => {
		if (!link) {
			setNotify('Enter a link for shortening');
		} else {
			try {
				const data = await request('http://localhost:5000/api/link/generate', 'POST', { from: link, tags: [], description: '' }, {
					Authorization: `Bearer ${auth.token}`,
				});
				console.log(data);
				setNotify(data.message);
			} catch (e) {
				setNotify('Error:', e.message);
			}
		}
		setInput('');
	};

	const pressHandler = async (evt) => {
		if (evt.key === 'Enter') {
			clickHandler();
		}
	};

	return (
		<div>
			<div className="url-input-form">
				<input
					className={auth.isAuthenticated ? 'url-input url-input--authorized-user' : 'url-input'}
					type="text"
					value={input}
					disabled={!auth.isAuthenticated}
					onChange={changeHandler}
					onKeyPress={pressHandler}
				/>
				<button
					className="button green-button shorten-button shorten-button"
					disabled={!auth.isAuthenticated}
					onClick={clickHandler}
					type="button"
				>
					shorten
				</button>
			</div>
			<p className="url-input__notification">{auth.isAuthenticated ? `${notify}` : 'Can only be used by authorized user' }</p>
		</div>

	);
};

export default LinkInput;
