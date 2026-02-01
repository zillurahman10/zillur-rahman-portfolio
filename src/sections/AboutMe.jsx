import mePhoto from '../assets/mePhoto.jpg'
import './AboutMe.css'

const AboutMe = () => {

    return (
        <>
            <div className='flex justify-center items-center mt-50'>
                <div className="p-10 typewriter" style={{width: "40%"}}>
                    <h3>Hi ! I'm MD ZILLUR RAHMAN</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate modi illum, blanditiis dolores repellat praesentium iusto optio in laborum eius corrupti natus atque unde ratione commodi amet veritatis sit veniam voluptatum et. Accusantium illo reprehenderit quas neque maxime recusandae quo!</p>
                </div>
                <div style={{width: "30%"}}>
                    <img className='rounded-xl' src={mePhoto} alt="" />
                </div>
            </div>
        </>
    )
}

export default AboutMe;