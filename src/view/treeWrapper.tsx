import React, { Component, MouseEvent } from "react";
import { SkillGroupDataType, SkillProvider, SkillTree, SkillTreeGroup } from "beautiful-skill-tree";
import Button from '@material-ui/core/Button';


type TreeWrapperProps = {
    treeId: string;
    tree: any[];
    title: string;
    handleSave: any;
    onSkillClick?: (skill: any) => void;
};

type TreeWrapperState = {
    showFullInfo: boolean;
};

type LinkType = {
    url: string;
    text: string;
};

export class TreeWrapper extends Component<TreeWrapperProps, TreeWrapperState> {
    state: TreeWrapperState = {
        showFullInfo: false
    };

    modifyIconPaths(tree: any[]): any[] {
        return tree.map(skill => {
            let updatedSkill = { ...skill };

            if (updatedSkill.icon) {
                updatedSkill.icon = `${process.env.PUBLIC_URL}/${updatedSkill.icon}`;
            }

            if (updatedSkill.children && updatedSkill.children.length > 0) {
                updatedSkill.children = this.modifyIconPaths(updatedSkill.children);
            }

            return updatedSkill;
        });
    }

    handleSkillClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const skillId = target.getAttribute('data-testid');

        if (skillId) {
            const skillData = this.findSkillById(skillId);
            if (this.props.onSkillClick && skillData) {
                this.props.onSkillClick(skillData);
            }
        }
    };

    findSkillById(id: string, tree: any[] = this.props.tree): any {
        for (const skill of tree) {
            if (skill.id === id) return skill;
            if (skill.children) {
                const foundSkill = this.findSkillById(id, skill.children);
                if (foundSkill) return foundSkill;
            }
        }
        return null;
    };

    toggleFullInfo = () => {
        this.setState(prevState => ({
            showFullInfo: !prevState.showFullInfo
        }));
    };

    renderSkill = (skill: any) => {
        return (
            <div key={skill.id} style={{ marginBottom: '50px' }}>
                <h2 style={{ fontWeight: 'bold', marginBottom: '10px' }}>Skill: {skill.title}</h2>
                <p style={{ marginBottom: '10px' }}>Overview: {skill.tooltip.content}</p>
                {skill.links && skill.links.map((link: LinkType, index: number) => (
                    <div key={index} style={{ marginBottom: index === skill.links.length - 1 ? '30px' : '10px' }}>
                        <h4 style={{ margin: '10px 0' }}>Guidance: {link.text}</h4>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">{link.url}</a>
                    </div>
                ))}
            </div>
        );
    };


    recursiveRenderSkills = (skills: any[]): any => {
        return skills.map(skill => (
            <React.Fragment key={skill.id}>
                {this.renderSkill(skill)}
                {skill.children && this.recursiveRenderSkills(skill.children)}
            </React.Fragment>
        ));
    };

    renderFullInfo = () => {
        return (
            <div className="full-tree-info">
                <h1 style={{ marginBottom: '60px' }}>Epic/Level: {this.props.title}</h1>
                {this.recursiveRenderSkills(this.props.tree)}
            </div>
        );
    };

    render() {
        const modifiedTree = this.modifyIconPaths(this.props.tree);
        const { showFullInfo } = this.state;

        return (
            <div>
                <div onClick={this.handleSkillClick}>
                    <SkillProvider>
                        <SkillTreeGroup theme={{
                            nodeBorderColor: 'white',
                            nodeBorderRadius: '32px',
                            nodeHoverBorder: '#E5D0E1',
                            nodeBackgroundColor: '#CBCEDA',
                            treeBackgroundColor: '#D0E1EF',
                            primaryFontColor: 'black',
                            headingHoverColor: 'white',
                            headingFontColor: 'white',
                            edgeBorder: '1px solid white',
                            nodeOverlayColor: '#CBCEDA',
                            border: '2px solid white',
                            tooltipBackgroundColor: 'red',
                            /* this is activated nodes*/
                            nodeActiveBackgroundColor: '#A1C1AB',
                            nodeAlternativeActiveBackgroundColor: '#A1C1AB',
                            nodeHoverBorderColor: '#6E6C6B',
                            backgroundColor: 'white',
                        }}>
                            {() => (
                                <SkillTree
                                    treeId={this.props.treeId}
                                    title={this.props.title}
                                    data={modifiedTree}
                                    collapsible
                                    handleSave={this.props.handleSave}
                                />
                            )}
                        </SkillTreeGroup>
                    </SkillProvider>
                </div>
                <div style={{ marginTop: '20px' }}>
                    <Button variant="contained" color="primary" onClick={this.toggleFullInfo}>
                        {showFullInfo ? "Hide" : "Show"} the complete training resources
                    </Button>

                </div>
                {showFullInfo && this.renderFullInfo()}


            </div>
        );
    }
}
