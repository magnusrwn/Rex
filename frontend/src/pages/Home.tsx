const Home = () => {
    return (
    <>
    {/* giving col space for everything to be in */}
    <div className="flex flex-col items-center max-w-4xl lg:mx-auto md:mx-20 mx-10 mt-24" id="container">

            {/* text [roughly]: "Automate all your fufillemt thuogh amazon in one place (here)" */}
            <div className="
             flex flex-col pt-2
             md:flex-row
            ">
                <div className="
                 flex flex-row
                 md:flex-col
                ">
                    <h1 className="
                     text-8xl font-semibold mx-3
                    ">Automate your fufillemt pipeline.</h1>
                </div>
                <div className="
                 flex flex-row mt-8
                 md:flex-col w-full mx
                ">
                    <p className="text-8xl" id="fufilledOrdersCounter">0</p> {/* HAVE THE NUMBER COUNT ANIMATION HERE */}
                </div>
            </div>
            {/* rhs [again, roughly]: [live fufilled counter, mini showcase of all aps/ things i can touch] */}

            <section id="homeBodyText">

            </section>
            

            <section id="homeHook">

            </section>
            

            <section id="homeFooter">

            </section>
    </div>
    </>
    )
}

export default Home