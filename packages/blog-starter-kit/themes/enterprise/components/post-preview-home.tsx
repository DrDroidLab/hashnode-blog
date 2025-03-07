import Image from 'next/image';
import Link from 'next/link';
import { User } from '../generated/graphql';
import { DateFormatter } from './date-formatter';

type Author = Pick<User, 'name' | 'profilePicture'>;

type Props = {
	title: string;
	coverImage: string | null | undefined;
	date: string;
	excerpt: string;
	author: Author;
	slug: string;
	series?: any;
};

export const PostPreviewHome = ({
	title,
	coverImage,
	date,
	excerpt,
	slug,
	author,
	series,
}: Props) => {
	const postURL = `/${slug}`;

	return (
		<Link href={postURL}>
			<div className="group grid w-full gap-2 border-b py-3 dark:border-b-neutral-800 lg:grid-cols-10 xl:grid-cols-12">
				<h1 className="text-lg font-semibold leading-tight text-slate-800 group-hover:underline dark:text-neutral-50 lg:col-span-8 xl:col-span-8">
					{title}
				</h1>
				<div className="hidden lg:block">
					{author.profilePicture && (
						<Image
							src={author.profilePicture}
							width={20}
							height={20}
							alt={author.name}
							className="rounded-full"
						/>
					)}
				</div>
				<div className="col-span-2 hidden xl:block">
					{author.name && (
						<p className="w-fit rounded-full border px-2 py-1 text-center text-xs font-light text-slate-500 dark:border-neutral-800 xl:text-xs">
							{series?.name}
						</p>
					)}
				</div>
				<div className="flex text-xs font-semibold text-slate-500 dark:text-neutral-300 lg:justify-end xl:text-sm">
					<DateFormatter dateString={date} />
				</div>
			</div>
		</Link>
	);
};
