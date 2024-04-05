import { Text } from 'components/text';

import styles from './Button.module.scss';
import clsx from 'clsx';

export const Button = ({
	className,
	title,
	onClick,
	type,
}: {
	className?: string;
	title: string;
	onClick?: (event: React.MouseEvent) => void; // adapted to use event.prevent default
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	return (
		<button 
			className={clsx(styles.button, className && styles[className])}
			type={type} 
			onClick={onClick}>
				<Text weight={800} uppercase>
					{title}
				</Text>
		</button>
	);
};
