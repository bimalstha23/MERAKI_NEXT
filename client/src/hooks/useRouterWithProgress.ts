import { isSameURL } from '@/utils/SameURL';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context';
import {
    usePathname,
    useRouter as useNextRouter,
} from 'next/navigation';
import NProgress from 'nprogress';

export function useRouterWithProgress() {
    const router = useNextRouter();
    const pathname = usePathname();

    function push(
        href: string,
        options?: NavigateOptions,
        NProgressOptions?: { showProgressBar?: boolean },
    ) {
        if (NProgressOptions?.showProgressBar === false)
            return router.push(href, options);

        const currentUrl = new URL(pathname, location.href);
        const targetUrl = new URL(href, location.href);

        if (isSameURL(targetUrl, currentUrl) || href === pathname)
            return router.push(href, options);

        NProgress.start();

        return router.push(href, options);
    }

    function back(NProgressOptions?: { showProgressBar?: boolean }) {
        if (NProgressOptions?.showProgressBar === false) return router.back();

        NProgress.start();

        return router.back();
    }

    return { ...router, push, back };
}