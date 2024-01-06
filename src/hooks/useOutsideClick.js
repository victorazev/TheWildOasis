import { useEffect, useRef } from 'react';

export function useOutsideClick(
	handler,
	listenCapturing = true,
) {
	const ref = useRef();

	useEffect(
		function () {
			function handleClick(evt) {
				if (ref.current && !ref.current.contains(evt.target)) {
					handler();
				}
			}

			document.addEventListener(
				'click',
				handleClick,
				listenCapturing,
			);

			return () =>
				document.removeEventListener(
					'click',
					handleClick,
					listenCapturing,
				);
		},
		[handler, listenCapturing],
	);

	return ref;
}
