import PropTypes from 'prop-types';

export const FilterSVG = ({ fill }) =>{

    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="32" viewBox="0 0 50 32" fill="none">
            <g>
                <path fillRule="evenodd" d="M48 3.5H42.7711C42.134 1.47145 40.2388 0 38 0C35.7612 0 33.866 1.47145 33.2289 3.5H2C1.17157 3.5 0.5 4.17157 0.5 5C0.5 5.82843 1.17157 6.5 2 6.5H33.2289C33.866 8.52855 35.7612 10 38 10C40.2388 10 42.134 8.52855 42.7711 6.5H48C48.8284 6.5 49.5 5.82843 49.5 5C49.5 4.17157 48.8284 3.5 48 3.5ZM38 8C39.6569 8 41 6.65685 41 5C41 3.34315 39.6569 2 38 2C36.3431 2 35 3.34315 35 5C35 6.65685 36.3431 8 38 8Z" fill={fill}/>
                <path fillRule="evenodd" d="M48 25.5H42.7711C42.134 23.4714 40.2388 22 38 22C35.7612 22 33.866 23.4714 33.2289 25.5H2C1.17157 25.5 0.5 26.1716 0.5 27C0.5 27.8284 1.17157 28.5 2 28.5H33.2289C33.866 30.5286 35.7612 32 38 32C40.2388 32 42.134 30.5286 42.7711 28.5H48C48.8284 28.5 49.5 27.8284 49.5 27C49.5 26.1716 48.8284 25.5 48 25.5ZM38 30C39.6569 30 41 28.6569 41 27C41 25.3431 39.6569 24 38 24C36.3431 24 35 25.3431 35 27C35 28.6569 36.3431 30 38 30Z" fill= {fill}/>
                <path fillRule="evenodd" d="M48 14.5H17.7711C17.134 12.4714 15.2388 11 13 11C10.7612 11 8.86603 12.4714 8.2289 14.5H2C1.17157 14.5 0.5 15.1716 0.5 16C0.5 16.8284 1.17157 17.5 2 17.5H8.2289C8.86603 19.5286 10.7612 21 13 21C15.2388 21 17.134 19.5286 17.7711 17.5H48C48.8284 17.5 49.5 16.8284 49.5 16C49.5 15.1716 48.8284 14.5 48 14.5ZM13 19C14.6569 19 16 17.6569 16 16C16 14.3431 14.6569 13 13 13C11.3431 13 10 14.3431 10 16C10 17.6569 11.3431 19 13 19Z" fill={fill}/>
            </g>
        </svg>
    )
}
FilterSVG.propTypes = {
    fill: PropTypes.string
};
FilterSVG.defaultProps = {
    fill: "white"
};

export const ExitSVG = ({ fill }) =>{

    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
            <g>
                <circle id='circle' cx="50" cy="50" r="47.5" fill={fill} stroke="#1f1f1f" strokeWidth="2"/>
                <path id="lineA" d="M27 26.383L73 73.033" stroke="#1f1f1f" strokeWidth="13" strokeLinecap="round"/>
                <path id="lineB" d="M27 72.65L73 26" stroke="#1f1f1f" strokeWidth="13" strokeLinecap="round"/>
            </g>
        </svg>
    )
}
ExitSVG.propTypes = {
    fill: PropTypes.string
};
ExitSVG.defaultProps = {
    fill: "#742626"
};

export const ArrowSVG = ({ fill }) => {

    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
            <g>
                <path d="M0.292893 7.29289C-0.0976311 7.68342 -0.0976311 8.31658 0.292893 8.70711L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41421 8L8.07107 2.34315C8.46159 1.95262 8.46159 1.31946 8.07107 0.928932C7.68054 0.538408 7.04738 0.538408 6.65685 0.928932L0.292893 7.29289ZM2 7H1L1 9H2L2 7Z" fill={fill}/>
            </g>
        </svg>
    )
}
ArrowSVG.propTypes = {
    fill: PropTypes.string
};
ArrowSVG.defaultProps = {
    fill: "white"
};

export const CopySVG  = ({ fill }) => {

    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="101" viewBox="0 0 80 101" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M6.75 9.75C6.75 8.09314 8.09315 6.75 9.75 6.74999L51.25 6.74999C52.9069 6.74999 54.25 5.40684 54.25 3.74999C54.25 2.09313 52.9069 0.749988 51.25 0.749985L9.75 0.749996C4.77944 0.749995 0.75 4.77943 0.75 9.75V59.25C0.75 60.9068 2.09315 62.25 3.75 62.25C5.40685 62.25 6.75 60.9068 6.75 59.25L6.75 9.75ZM22 17H70C72.2091 17 74 18.7909 74 21V91C74 93.2091 72.2091 95 70 95H22C19.7909 95 18 93.2091 18 91V21C18 18.7909 19.7909 17 22 17ZM12 21C12 15.4771 16.4772 11 22 11H70C75.5228 11 80 15.4771 80 21V91C80 96.5228 75.5228 101 70 101H22C16.4772 101 12 96.5228 12 91V21Z" fill={fill}/>
        </svg>
    )
}
CopySVG.propTypes = {
    fill: PropTypes.string
};
CopySVG.defaultProps = {
    fill: "black"
};