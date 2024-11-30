import React from 'react';


function LandingPage() {
    return (
        <div>
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                        <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                            Announcing our next round of funding.{' '}
                            <a href="#" className="font-semibold text-indigo-600">
                                <span aria-hidden="true" className="absolute inset-0" />
                                Read more <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div> */}
                    <div className="text-center">
                        <h1 className="text-balance text-5xl font-bold tracking-tight text-gray-700 sm:text-7xl">
                            AD<span className='text-yellow-300'>HUB</span>
                        </h1>
                        <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                            A Digital Advertisement Solution
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#"
                                className="rounded-md bg-yellow-300 px-3.5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Get started
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage