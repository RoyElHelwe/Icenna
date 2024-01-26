import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Container, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function ControlledAccordions() {
    const data = [
        {
            question: "How would I pay for the subscription and for how long?",
            answers: [
                "The solution is a subscription model where you pay on a monthly or annual basis.",
                "Also, you can pay using online payment or bank transfer."
            ]
        },
        {
            question: "I would like to use the free package. How long can I use it?",
            answers: [
                "It is free for up to 5 users only.",
                "If you want to add more.. then you need to pay for the total number of users."
            ]
        },
        {
            question: "Can I install iCenna in my data center and host it?",
            answers: [
                "Yes we support that and cloud version is available too"
            ]
        },
        {
            question: "Do you use the cloud or on premise ?",
            answers: [
                "iCenna is a cloud ready solution where all you need is to subscribe to the package and get started ",
                "Also, if you prefer to host iCenna in your data center or on premise solution , please contact us at sales@iCenna.com"
            ]
        }, {
            question: "Does iCenna support NPHIES Integration and NPHIES certified and ready?",
            answers: [
                "Yes. ICenna is NPHIES certified … please refer to CHI list of vendors:"
            ]
        },
        {
            question: "Do you support Saudi healthcare standard, such as ICD10, ACHi, SBS and others?",
            answers: [
                "Yes.. iCenna is fully compliant and certified with NPHIES, CHI and Saudi Standard"
            ]
        }
    ]
    const [expanded, setExpanded] = React.useState(false);
    const {t} = useTranslation();
    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Container maxWidth="lg" sx={{ mt: 20 }}>
            <Stack spacing={12}>
                <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 700, mb: 2 }}>
                    {t("Any questions?")}
                    sales@iCenna.com
                </Typography>
                <Stack>
                    {
                        data.map((item, index) => (
                            <Accordion
                                expanded={expanded === `panel${index}`}
                                onChange={handleChange(`panel${index}`)}
                                key={index}
                                sx={{ mb: 2 }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel${index}bh-content`}
                                    id={`panel${index}bh-header`}
                                >
                                    <Typography sx={{ width: '90%', fontWeight: 700, flexShrink: 0 }}>
                                        {t(item.question)}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        {item.answers.map((answer, index1) => (
                                            <Typography key={index1} variant="span" gutterBottom sx={{fontSize:'14px'}}>
                                                {t(answer)}
                                            </Typography>
                                        ))}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
                </Stack>
            </Stack>

        </Container>
    );
}