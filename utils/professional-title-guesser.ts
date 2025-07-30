export function ProfessionalTitle(jsonCv: any) {
    // experience(array) where object has "title".title
    // projects(array) where object has "name".name
    // education(array) where object has "institution".institution
    // profile // too long, still usable

    let professional_title = '';

    try {
        if (jsonCv.hasOwnProperty('experience')) {
            if (Array.isArray(jsonCv.experience)) {
                for (let i = 0; i < jsonCv.experience.length; i++) {
                    if (jsonCv.experience[i].hasOwnProperty('title')) {
                        professional_title = jsonCv.experience[i].title;
                        break;
                    }
                }
            }
        }
        if (professional_title === '' && jsonCv.hasOwnProperty('projects')) {
            if (Array.isArray(jsonCv.projects)) {
                for (let i = 0; i < jsonCv.projects.length; i++) {
                    if (jsonCv.projects[i].hasOwnProperty('name')) {
                        professional_title = jsonCv.projects[i].name;
                        break;
                    }
                }
            }
        }
        if (professional_title === '' && jsonCv.hasOwnProperty('education')) {
            if (Array.isArray(jsonCv.education)) {
                for (let i = 0; i < jsonCv.education.length; i++) {
                    if (jsonCv.education[i].hasOwnProperty('institution')) {
                        professional_title = jsonCv.education[i].institution;
                        break;
                    }
                }
            }
        }
        if (professional_title === '' && jsonCv.hasOwnProperty('profile')) {
            if (typeof jsonCv.profile === 'string') {
                // cut the string
                professional_title = jsonCv.profile.split('.')[0];
            }
        }

    } catch (error) {
        console.error(error);
    }

    return professional_title
}