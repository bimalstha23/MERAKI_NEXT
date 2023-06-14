import RouteWrapper from "../Providers/RouteProvider";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createRoutes = (args: any) => {
    return {
        ...args,
        element:
            <RouteWrapper>
                <args.element />
            </RouteWrapper>
        ,
        errorElement: <div>Something Went Wrong </div>,
    };
};

