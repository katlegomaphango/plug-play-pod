import { useNavigate, useParams } from "react-router-dom"
import { Box, Button, Paper, Tab, Tabs, Typography, styled } from "@mui/material"
import { theme } from "../theme"
import { useGetShowInfoQuery } from "../redux/services/netlify"
import Loader from "../components/Loader/Loader"
import Error from "../components/Error/Error"
import { EPISODE, SEASON, SHOW } from "../assets/constants"
import { ArrowBack } from "@mui/icons-material"
import { useState } from "react"
import EpisodeTile from "../components/EpisodeTile/EpisodeTile"

const ShowHeader = styled(Paper)({
    height: '20rem',
    background: `
        linear-gradient(-135deg, 
            var(--clr-dark-dark),
            var(--clr-dark-gray))
    `,
    display: 'flex',
    gap: '1rem',
    padding: '1rem',
    borderRadius: '0.5rem'
})

const ShowBody = styled(Paper)({
    background: `
        linear-gradient(135deg, 
            var(--clr-dark-dark),
            var(--clr-dark-gray))
    `,
    marginTop: '1rem'
})

const ImageBox = styled(Box)({
    width: '19.8rem',
})

const ShowTitle = styled(Typography)({
    fontSize: '2.5rem',
    fontWeight: 'bold',
    marginRight: '1rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
})

const ShowDesc = styled(Typography)({
    overflow: 'hidden',
})

type TabPanelProps = {
    index: number,
    value: number,
    episode: EPISODE
}

const CustomTabPanel = (props: TabPanelProps) => {
    const { index, value, episode } = props

    return (
        <>
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`${index}`}
            >
                <Box>
                    {value === index && <EpisodeTile episode={episode} />}
                    
                </Box>
            </div>
        </>
    )
}

const ShowPage = () => {
    const [tabValue, setTabValue] = useState(0)
    const navigate = useNavigate()
    const { id } = useParams()
    const { data, isFetching, error} = useGetShowInfoQuery(id)

    if (isFetching) return <Loader />
    if (error) return <Error />

    const ShowData: SHOW = data
    const SeasonsData: SEASON[] = ShowData.seasons
    console.log(SeasonsData[0].episodes)

    const handleTabChange = (e: any, newValue: number) => {
        setTabValue(newValue)
    }

    return (
        <>
            <Box bgcolor={theme.palette.primary.dark} flex={3} p={2}>
                <Box>
                    <ShowHeader variant="outlined" square >
                        <ImageBox>
                            <img width={'100%'} src={ShowData.image} alt="" />
                        </ImageBox>
                        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%', gap: '1rem' }}>
                            <Button onClick={() => navigate(-1)} variant="contained" size="large" sx={{alignSelf: "flex-end"}}>
                                <ArrowBack />
                                Back
                            </Button>
                            <ShowTitle variant="h3">
                                {ShowData.title}
                            </ShowTitle>
                            <ShowDesc>
                                {ShowData.description}
                            </ShowDesc>
                        </Box>
                    </ShowHeader>
                    <ShowBody>
                        <Box>
                            <Tabs value={tabValue}
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="scrollable auto tabs"
                                onChange={(e: any, value: number) => handleTabChange(e, value)}
                                textColor="secondary"
                                indicatorColor="secondary"
                            >
                                {SeasonsData.map((item) => (
                                    <Tab key={item.season}
                                        label={item.title}
                                    />
                                ))}
                            </Tabs>
                        </Box>
                        <Box>
                            {SeasonsData.map((item) => (
                                <Box key={item.season}>
                                    {item.episodes.map((se, i) => (
                                        <CustomTabPanel
                                            value={tabValue}
                                            key={se.episode}
                                            index={i}
                                            episode={se}
                                        />
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    </ShowBody>
                </Box>
                
            </Box>
        </>
    )
}

export default ShowPage