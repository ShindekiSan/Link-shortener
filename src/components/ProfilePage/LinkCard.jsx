import React, {
	useEffect, useState, useContext, useCallback,
} from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useHttp } from '../../hooks/http.hook';

const LinkCard = function ({ link }) {
	const auth = useContext(AuthContext);
	const { request, loading } = useHttp();
	const linkId = useParams().id;
	const [linkInfo, setLinkInfo] = useState(link);
	const [upload, setUpload] = useState('confirm');
	const [linkDate, setLinkDate] = useState('');
	const [editState, setEditState] = useState(false);
	const [description, setDescription] = useState(linkInfo.description);
	const [tags, setTags] = useState('');
	const [tagsArray, setTagsArray] = useState([]);

	const formatDate = () => {
		const date = new Date(linkInfo.date);
		setLinkDate(date.toLocaleDateString());
	};

	useEffect(() => {
		formatDate();
	}, [formatDate]);

	const changeTagsHandler = (evt) => {
		setTags(evt.target.value);
		console.log(tags);
	};

	const changeDescriptionHandler = (evt) => {
		setDescription(evt.target.value);
	};

	useEffect(() => {
		setTagsArray(tags.split(' ').map((tag) => ({ tagName: tag })));
	}, [tags]);

	const editClickHandler = () => {
		setEditState(!editState);
		if (!tags) {
			link.tags.forEach((tag) => {
				setTags((currentTags) => `${currentTags + tag.tagName} `);
			});
		}
	};

	const getLink = useCallback(async () => {
		try {
			const fetched = await request(`http://localhost:5000/api/link/${linkId}`, 'GET', null, {
				Authorization: `Bearer ${auth.token}`,
			});

			setLinkInfo(fetched);
		} catch (e) {
			console.log(e.message);
		}
	}, [auth.token, linkId, request]);

	const confirmChanges = async () => {
		try {
			setUpload('loading...');
			const data = await request('http://localhost:5000/api/link/edit', 'POST', { code: link.code, tags: tagsArray, description }, {
				Authorization: `Bearer ${auth.token}`,
			});

			await getLink();

			console.log(data);
			setEditState(false);
		} catch (e) {
			console.log('Error', e.message);
		}
		setUpload('confirm');
		console.log(linkInfo);
	};

	return (
		<div className="link-card">
			<Link to="/profile"><button className="button green-button back-button" type="button">Back</button></Link>
			<h3 className="link-card-title">Your link</h3>
			<p>
				code:
				{linkInfo.code}
			</p>
			<p>
				to:
				<a href={linkInfo.to} target="_blank" rel="noopener noreferrer">{linkInfo.to}</a>
			</p>
			<p>
				from:
				<a href={linkInfo.from} target="_blank" rel="noopener noreferrer">{linkInfo.from}</a>
			</p>
			<p>
				number of clicks:
				{linkInfo.clicks}
			</p>
			{editState
				? (
					<textarea
						className="link-card-editor__textarea"
						value={tags}
						onChange={changeTagsHandler}
						placeholder="Tags for link"
						disabled={loading}
					/>
				) : (
					<p>
						tags:
						{linkInfo.tags.map((tag) => `${tag.tagName} `)}
					</p>
				)}
			{editState
				? (
					<textarea
						className="link-card-editor__textarea"
						value={description}
						onChange={changeDescriptionHandler}
						placeholder="Description for link"
						disabled={loading}
					/>
				) : (
					<p>
						description:
						{linkInfo.description}
					</p>
				)}
			{editState
				? (
					<button
						className="button green-button edit-button"
						onClick={confirmChanges}
						disabled={loading}
						type="button"
					>
						{upload}
					</button>
				) : (
					<>
					</>
				)}
			<p>
				date of creating:
				{linkDate}
			</p>
			<button className="button green-button edit-button" onClick={editClickHandler} disabled={loading} type="button">edit</button>
			<p>Note: you can edit description and tags of your link</p>
		</div>
	);
};

export default LinkCard;
