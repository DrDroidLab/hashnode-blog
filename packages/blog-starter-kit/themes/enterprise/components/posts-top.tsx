import { PublicationNavbarItem } from 'generated/graphql';
import { useRouter } from 'next/router';
import { useAppContext } from './contexts/appContext';
import SearchBox from './search-box';

function hasUrl(
	navbarItem: PublicationNavbarItem,
): navbarItem is PublicationNavbarItem & { url: string } {
	return !!navbarItem.url && navbarItem.url.length > 0;
}

function PostsTop() {
	const { publication } = useAppContext();
	const navbarItems = publication.preferences.navbarItems.filter(hasUrl);
	const router = useRouter();
	const {
		query: { types },
	} = router;

	// Function to handle clicks and update query params for multi-select
	const handleClick = (itemType: string) => {
		// Parse the existing types from query (it might be a string or array)
		const selectedTypes = Array.isArray(types) ? types : types ? [types] : [];

		// Toggle the selection (add or remove the type)
		const updatedTypes = selectedTypes.includes(itemType)
			? selectedTypes.filter((t) => t !== itemType) // Remove the type
			: [...selectedTypes, itemType]; // Add the type

		// Update query params, passing an empty object if no types are selected
		router.push({
			pathname: '',
			query: updatedTypes.length > 0 ? { types: updatedTypes } : {},
		});
	};

	// Check if "All" is selected
	const isAllSelected = !types || (Array.isArray(types) && types.length === 0);

	return (
		<div className="grid w-full grid-cols-4 gap-2">
			<div className="col-span-4 grid grid-cols-1 gap-2 lg:col-span-3">
				<div className="flex items-center gap-3">
					<button
						onClick={() => router.push({ pathname: '', query: {} })} // Deselect all types
						className={`${
							isAllSelected ? 'bg-slate-400 text-white dark:bg-slate-500 dark:text-neutral-900' : ''
						} rounded-xl border px-2 py-1 text-sm text-slate-500 ring-slate-400 transition-all hover:ring-1 dark:border-neutral-800 dark:ring-neutral-600`}
					>
						All
					</button>
					{navbarItems.map((item) => {
						const urlList = item.url.split('/');
						const itemType = urlList[urlList.length - 1];
						const isSelected = Array.isArray(types) ? types.includes(itemType) : types === itemType;

						return (
							<button
								key={item.id}
								onClick={() => handleClick(itemType)}
								className={`${
									isSelected
										? 'bg-slate-400 text-white dark:bg-slate-500 dark:text-neutral-900'
										: ''
								} rounded-xl border px-2 py-1 text-sm text-slate-500 ring-slate-400 transition-all hover:ring-1 dark:border-neutral-800 dark:ring-neutral-600`}
							>
								{item.label}
							</button>
						);
					})}
				</div>
			</div>
			<div className="col-span-4 grid w-full grid-cols-1 lg:col-span-1">
				<SearchBox />
			</div>
		</div>
	);
}

export default PostsTop;
