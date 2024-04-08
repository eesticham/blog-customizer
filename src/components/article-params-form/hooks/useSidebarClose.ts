import { useEffect } from 'react';

type TUseSidebarClose = {
	isOpened: boolean;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export function useSidebarClose({
	isOpened,
	onClose,
	rootRef,
}: TUseSidebarClose) {
	useEffect(() => {
		if (!isOpened) return; // останавливаем действие эффекта, если закрыто

		function handleOutsideClick(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node &&
				rootRef.current &&
				!rootRef.current.contains(target);
			if (isOutsideClick && onClose) {
				onClose(); // Call onClose if clicked outside
			}
		}

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && onClose) {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleOutsideClick);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleOutsideClick);
		};
	}, [isOpened, onClose, rootRef]);
}
