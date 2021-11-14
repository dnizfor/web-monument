import * as yup from 'yup';

const schema = yup.object().shape({
    monumentName: yup.string().required(),
    monumentShortName: yup.string().required(),
    monumentPhotoLink: yup.string().required().url(),
    monumentContents: yup.string().min(2, 'Too Short!').max(100, 'Too Long!').required(),
});

export default schema