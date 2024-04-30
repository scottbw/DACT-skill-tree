import React, { useState } from "react";
import PropTypes from 'prop-types';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styled from "styled-components";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


interface Props {
    data: any;
}

const Portrait = styled.img<Props> `
    border-color: ${props => props.data.completion === 100 ? props.data.color: 'gray'};
`
const Title = styled.h2<Props> `
    color: ${props => props.data.completion === 100 ? props.data.color: 'black'};
`

const Description = styled.p`
    font-size: 1rem;
`

function SimpleDialog(props: any) {
    const { onClose, open } = props;
    const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);

    const handleListItemClick = (skillId: string) => {
        setSelectedSkillId(prevSelectedSkillId => prevSelectedSkillId === skillId ? null : skillId);
    };

    const handleClose = () => {
        onClose();
        setSelectedSkillId(null);
    };

    const dialogPaperStyle = {
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        color: 'black',

    };

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}
            PaperProps={{
                style: {
                    backgroundColor: 'white',
                    border: '2px solid #000',
                    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                    color: 'black',
                    width: '50vw',
                    maxWidth: '90vw',

                }
            }}
        >
            <h2 className="dialog-title" id="simple-dialog-title">
                What skills do I need?
            </h2>

            <List>
                {props.skills.map((skill: any) => (
                    <React.Fragment key={skill.id}>
                        <ListItem button onClick={() => handleListItemClick(skill.id)}>
                            <ListItemText primary={<strong>Skill: {skill.title}</strong>} />
                        </ListItem>
                        {selectedSkillId === skill.id && (
                            <div style={{ paddingLeft: 20, paddingRight: 20 }}>
                                <p className="standard-text">Overview: {skill.skill_desc}</p>
                                {skill.skill_info && skill.skill_info.map((info: { text: string; url: string; }, index: number) => (
                                    <React.Fragment key={index}>
                                        {info.text && <p className="standard-text">Guidance: {info.text}</p>}
                                        {info.url && <p className="standard-text">URL: <a href={info.url} className="custom-link" target="_blank" rel="noopener noreferrer" style={{ color: '#7e9cc1' }}>{info.url}</a></p>}
                                    </React.Fragment>
                                ))}
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </List>
            <Button variant="contained" color="primary" onClick={handleClose}>
                Close
            </Button>
        </Dialog>
    );
}

export default SimpleDialog;

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    skills: PropTypes.any.isRequired
};

export function Profile(props: any) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={'profile'}>
            <Title data={props.data} className={'profile-name'}>{props.data.name}</Title>
            <Portrait data={props.data} className={'profile-portrait'} src={`${process.env.PUBLIC_URL}/${props.data.portrait}`}/>
            <div className={'completion'}>
                <CircularProgressbar
                    value={props.data.completion}
                    text={`${props.data.completion}%`}
                    styles={{
                        path: {stroke: `${props.data.color}`,},
                        text: {fill: `${props.data.color}`,}
                    }}
                />
            </div>
            <Button variant="text" color="inherit" size={"small"} onClick={handleClickOpen}>
                What skills do I need?
            </Button>
            <SimpleDialog skills={props.data.neededSkills} open={open} onClose={handleClose}/>
            <Description>{props.data.description}</Description>
        </div>
    )
}