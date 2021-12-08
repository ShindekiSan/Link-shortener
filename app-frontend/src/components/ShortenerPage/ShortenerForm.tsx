import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';

interface TagsList {
	tagName: string
}

const ShortenerForm = function () {
	const [notify, setNotify] = useState('');
	const [input, setInput] = useState('');
	const [link, setLink] = useState('');
	const [tags, setTags] = useState('');
	const [description, setDescription] = useState('');
	const [tagsArray, setTagsArray] = useState<Array<TagsList>>([]);
	const auth = useContext(AuthContext);
	const { request } = useHttp();

	const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setLink(evt.target.value);
		setInput(evt.target.value);
	};

	const changeTagsHandler = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTags(evt.target.value);
	};

	const changeDescription = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDescription(evt.target.value);
	};

	useEffect(() => {
		setTagsArray(tags.split(' ').map((tag) => ({ tagName: tag })));
	}, [tags]);

	const clickHandler = async () => {
		if (!link) {
			setNotify('Enter a link for shortening');
		} else {
			try {
				const data = await request('http://localhost:5000/api/link/generate', 'POST', { from: link, tags: tagsArray, description }, {
					Authorization: `Bearer ${auth.token}`,
				});
				setNotify(data.message);
			} catch (e: any) {
				setNotify(`Error:', ${e.message}`);
			}
		}
		setInput('');
		setTags('');
		setDescription('');
	};

	return (
		<div className="shortener-block">
			<h2 className="shortener-title">Shorten your link</h2>
			<div className="shortener-form">
				<input
					className="shortener-form__link-input"
					value={input}
					onChange={changeHandler}
					placeholder="Enter your link"
				/>
				<textarea
					className="shortener-form__textarea"
					value={description}
					onChange={changeDescription}
					placeholder="Write small description about link (optional)"
				/>
				<textarea
					className="shortener-form__textarea"
					value={tags}
					onChange={changeTagsHandler}
					placeholder="Enter some tags for link (optional)"
				/>
				<button className="button green-button" onClick={clickHandler} type="button">shorten</button>
			</div>
			<p className="shortening-block__notification">{notify}</p>
		</div>

	);
};

export default ShortenerForm;
