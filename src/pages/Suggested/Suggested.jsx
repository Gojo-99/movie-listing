import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './Suggested.css'

const Suggested = () => {
	const location = useLocation()
	const [suggestedItems, setSuggestedItems] = useState([])

	useEffect(() => {
		const locationItems = location.state?.suggestedItems || []

		const storageItems =
			JSON.parse(localStorage.getItem('suggestedItems')) || []

		const mergedItems = [
			...locationItems,
			...storageItems.filter(
				storageItem =>
					!locationItems.some(locItem => locItem.mal_id === storageItem.mal_id)
			),
		]

		setSuggestedItems(mergedItems)
	}, [location.state])

	const clearSuggestions = () => {
		localStorage.removeItem('suggestedItems')
		setSuggestedItems([])
	}

	return (
		<div className='suggested-page'>
			<div className='section'>
				<h1>Your Suggestions</h1>
				<p className='subtitle'>Thank you for your suggestions!</p>

				<div className='sugg-block'>
					{suggestedItems.length === 0 ? (
						<div className='empty-message'>
							<p>You haven't suggested anything yet.</p>
							<a href='/suggestme' className='suggest-link'>
								Go to Suggest Me page
							</a>
						</div>
					) : (
						<div className='suggested-grid'>
							{suggestedItems.map(item => (
								<div key={`${item.mal_id}-${item.date}`} className='card'>
									<div className='poster-box'>
										<img
											src={
												item.images?.webp?.large_image_url ||
												'https://via.placeholder.com/300x400?text=No+Image'
											}
											alt={item.title}
											className='suggested-image'
											onError={e => {
												e.target.src =
													'https://via.placeholder.com/300x400?text=No+Image'
											}}
										/>
										{item.score && (
											<span className='score'> ⁕ {item.score}</span>
										)}
									</div>

									<h3 className='suggested-title'>
										{item.title.length > 25
											? `${item.title.substring(0, 25)}...`
											: item.title}
									</h3>

									<p className='suggested-date'>
										Suggested on: {new Date(item.date).toLocaleDateString()}
									</p>
								</div>
							))}
						</div>
					)}
				</div>

				<div className='btn-box'>
					{suggestedItems.length > 0 && (
						<button onClick={clearSuggestions} className='clear-button'>
							Clear
						</button>
					)}
				</div>
			</div>
		</div>
	)
}

export default Suggested
