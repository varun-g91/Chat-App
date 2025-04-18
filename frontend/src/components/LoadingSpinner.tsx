import { infinity } from "ldrs";

infinity.register();
const LoadingSpinner = () => {
    return (
        <div>
            <h1>Loading...</h1>
            <l-infinity
                size="55"
                stroke="4"
                stroke-length="0.15"
                bg-opacity="0.1"
                speed="1.3"
                color="white"
            ></l-infinity>
        </div>
    );
};

export default LoadingSpinner;
