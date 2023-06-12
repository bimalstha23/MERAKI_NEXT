import RouteWrapper from "../Providers/RouteProvider";


export const createRoutes = (args: createRoute) => {
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

