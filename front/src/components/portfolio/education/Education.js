import Block from "../Block";

const Education = ({ user }) => {
    return(
        <Block>
            <h1>학력</h1>
            <h1>{user?.id}</h1>
            <div>학교 이름</div>
            <div>전공</div>
            <div>재학중</div>
        </Block>
    )
}

export default Education;