import {useLocation} from 'react-router-dom'
import Message from '../layout/Message'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../project/ProjectCard'
import styles from './Projects.module.css'
import { useState, useEffect } from 'react'


function Projects() {
    const [Projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    const location = useLocation()
        let message = ''
        if (location.state) {
            message = location.state.message
        }

        useEffect(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'content-Type': 'application/json',
                },
            }).then(resp => resp.json())
            .then(data => {
                console.log(data)
                setProjects(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err))
        }, []) 

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
            <h1>Meus Projetos</h1>
            <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {message && <Message type="succeses" msg={message} /> }
            <Container customClass='start'>
                {Projects.length > 0 && 
                  Projects.map((project) => (
                    <ProjectCard id={project.id} name={project.name} budget={project.budget} category={project.category.name} key={project.id} />
                  ))}
            {!removeLoading && <Loading />}
            {removeLoading && Projects.length === 0 && (
                <p>Não há projetos cadastrados!</p>
            )}
            </Container>
        </div>
    )
}

export default Projects