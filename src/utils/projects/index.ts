import { skills } from './skills';
import { mobile } from './mobile';
import { web } from './web';
import { automation } from './automation';
import { IProjectInterface } from '../model/projectModel';


const projects: IProjectInterface[] = [...web, ...mobile, ...automation];



export {
    skills,
    projects
};