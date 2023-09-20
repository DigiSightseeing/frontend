const PageNotFound = () => {
    return (
        <>
            <main className="grid h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-blueprimary text-base font-semibold">
                        404
                    </p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        Sorry, we couldn&apos;t find the page you&apos;re
                        looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <a
                            href="/"
                            className="bg-blueprimary hover:bg-blueprimary focus-visible:outline-blueprimary rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                            Go back home
                        </a>
                        <a
                            href="/contact"
                            className="rounded-md  bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white">
                            Contact us <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
};
export default PageNotFound;
