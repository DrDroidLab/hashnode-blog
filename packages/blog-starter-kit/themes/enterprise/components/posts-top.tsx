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
		query: { type },
	} = router;

	// Function to handle clicks and update query params
	const handleClick = (type: string | undefined) => {
		if (!type) {
			router.push({
				pathname: '',
			});
			return;
		}
		router.push({
			pathname: '',
			query: { type: type ? type : '' },
		});
	};

	return (
		<div className="grid w-full grid-cols-4 gap-2">
			<div className="col-span-4 grid grid-cols-1 gap-2 lg:col-span-3">
				<div className="flex items-center gap-3">
					<button
						onClick={() => handleClick(undefined)}
						className={`${
							!type ? 'bg-slate-400 text-white dark:bg-slate-500 dark:text-neutral-900' : ''
						} rounded-xl border px-2 py-1 text-sm text-slate-500 ring-slate-400 transition-all hover:ring-1 dark:border-neutral-800 dark:ring-neutral-600`}
					>
						All
					</button>
					{navbarItems.map((item) => {
						const urlList = item.url.split('/');
						const itemType = urlList[urlList.length - 1];

						return (
							<button
								key={item.id}
								onClick={() => handleClick(itemType)}
								className={`${
									type === itemType
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
