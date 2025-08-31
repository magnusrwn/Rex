import CountUp from '../blocks/CountUp'
import Button from '../components/Button'
import Card from '../components/Card'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()
    return (
    <>
    {/* giving col space for everything to be in */}
    <div className="min-h-[800px] flex flex-col items-center max-w-4xl lg:mx-auto md:mx-20 mx-10 mt-24">
        {/* HERO SECTION */}
        <div className="
            flex flex-col pt-2
            md:flex-row
            mt-15
        ">
            <div className="
                flex flex-row
                md:flex-col
            ">
                <h1 className="
                    font-bold mx-3 text-6xl
                    md:text-8xl
                ">Automate your fufillemt pipeline.</h1>
            </div>
            <div className="
                flex flex-col justify-end mt-16
                md:flex-col w-full
            ">
                <div className='h-full bg-black rounded-xl shadow-2xl'>
                    <div className='mt-23 mx-5'>  
                        <CountUp
                            from={0}
                            to={10000} // FETCH NUMBER HERE!! ( from db)
                            separator=","
                            direction="up"
                            duration={1}
                            className=" count-up-text text-7xl font-sans text-white"
                        />
                        <div className='mt-6'>
                            <p className='text-4xl text-white mt-2 fonst-mono font-bold'>
                                Orders fufilled
                            </p>
                            <p className='text-white text-lg'>
                                and counting...
                            </p>
                        </div>
                        <div className='w-full h-fit flex flex-row justify-end mb-5'>
                            <Button
                                variant='secondary'
                                className='px-4 py-2 rounded-lg bg-white hover:text-black transition-all'
                                onClick={()=>navigate('/register')}
                            >Get Started</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* ICONS */}
        <div className='
         bg-white border border-slate-100 h-fit py-10 my-25 w-full flex-row shadow-2xl rounded-xl flex
         px-10 justify-between
         md:px-50
        '>
            <img src='/ebayLogo.jpg' alt='ebay logo' className='h-15 md:h-20 mt-2 '></img>
            <img src='/shopifyLogo.png' alt='shopify logo' className='h-20 md:h-25'></img>
            <img src='/tiktok.png' alt='tiktok logo' className='h-20 md:h-25'></img>
        </div>
        {/* WHATS ON THE TABLE? */}
        {/* REDIRECT ALL TO THE SIGNUP PAGE */}
        <div className='
         grid w-full
         grid-cols-1 grid-rows-3
         gap-10
         md:grid-cols-2 md:grid-rows-2 md:gap-5 
        '>
            <h2 className='
                w-full justify-end text-5xl font-semibold
                hidden
                md:flex md:order-2 md:ml-6 md:mt-[25%]
            '>
                So... what's on offer?
            </h2>
            <Card
             className='
              bg-white border border-slate-100 shadow-2xl order-1
              hover:bg-slate-100 hover:border-slate-200 transition-all duration-700 hover:cursor-pointer
                md:order-1
            '
             title='Centralised Fulfillment'
             description='I will figure this later'
             onClick={()=>navigate('register')}
            />
            <Card
             className='
              bg-black text-white transition-color duration-300 w-full shadow-2xl order-3
                hover:cursor-pointer hover:bg-slate-800
                md:order-2
            '
             title='Get Started!'
             description='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar sit amet mauris venenatis porttitor. Ut condimentum auctor est eget vestibulum. Maecenas quis ultricies nibh. Cras convallis laoreet leo vel ultricies. Mauris sed nunc purus. Etiam dictum eros odio, in lobortis mi ultrices in. Mauris faucibus nec neque ut porta. Nulla eget eros augue.'
             onClick={()=>navigate('register')}
            />
            <Card
             className='
              bg-white border border-slate-100 shadow-2xl order-2
              hover:bg-slate-100 hover:border-slate-200 transition-all duration-700 hover:cursor-pointer
                md:order-3
            '
             title='Unfied Sales Data'
             description='I will figure this later'
             onClick={()=>navigate('register')}
            />
            {/* <Card title='Informed support' description='I will figure this later' /> */}
        </div>
        <div className='
           my-25 w-full bg-white p-10 rounded-2xl border-1 border-slate-200 shadow-2xl'>
            <h2 className='text-6xl font-semibold'>
                A Deeper Dive:
            </h2>
            <p className='break-words pt-5'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ligula ligula, sollicitudin a lacus non, dapibus consequat purus. Etiam non augue felis. Ut vitae nisl sed diam pharetra dictum congue sed purus. Sed blandit ornare augue quis feugiat. Mauris id enim vel dui viverra sollicitudin non sit amet erat. Donec nec blandit orci. Etiam ac laoreet est. Nullam tincidunt, purus eu varius mollis, sem mi pellentesque nisi, vitae congue lorem leo eu odio. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla ex tellus, venenatis sit amet lobortis vitae, pharetra efficitur est. Cras luctus est mollis dui congue mattis. Interdum et malesuada fames ac ante ipsum primis in faucibus.
            </p>
            
            <p className='mt-3'>
                Proin blandit sollicitudin libero. Mauris vel eleifend felis, ac facilisis nisi. Maecenas mauris mauris, imperdiet nec nunc vel, dapibus tincidunt urna. Quisque non neque vitae risus rhoncus interdum ac et neque. Sed lacinia, elit ac interdum pellentesque, urna velit finibus enim, at maximus nibh sapien eget sapien. Mauris vulputate sit amet eros et rhoncus. Nam varius, velit ac venenatis pulvinar, nulla metus commodo tortor, ultrices facilisis ligula diam eu velit. Ut lacinia condimentum leo. Quisque lacinia enim sit amet consectetur ultrices. Duis ac mi eu augue pharetra consectetur a ac tellus. In tristique fringilla felis, pretium lacinia magna cursus at. Pellentesque eu metus mauris. Morbi maximus vitae lectus sit amet fermentum. Aenean nulla purus, auctor et commodo non, tempor in orci. Integer pellentesque feugiat lacus sed elementum.
            </p>
        </div>
    </div>
    <Footer />
    </>
    )
}

export default Home