import React, { useContext, useState } from 'react';
import LinkInput from '../../components/MainPage/LinkInput';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';

const LinkInputContainer = function () {
	const { request } = useHttp();
	const [link, setLink] = useState('');
	const [input, setInput] = useState('');
	const [notify, setNotify] = useState('');
	const auth = useContext(AuthContext);

	const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
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
			} catch (e: any) {
				setNotify(`Error: ${e.message}`);
			}
		}
		setInput('');
	};

	const pressHandler = async (evt: React.KeyboardEvent) => {
		if (evt.key === 'Enter') {
			clickHandler();
		}
	};

	return (
		<LinkInput 
			isAuthenticated={auth.isAuthenticated}  
			linkValue={input} 
			changeHandler={changeHandler} 
			clickHandler={clickHandler} 
			pressHandler={pressHandler} 
			notify={notify} 
		/>
	);
};

export default LinkInputContainer;
