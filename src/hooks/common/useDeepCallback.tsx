/* eslint "@typescript-eslint/no-unsafe-function-type": "off" */
import { cloneDeep, isEqual } from 'lodash-es';
import { DependencyList, useCallback, useRef } from 'react';

const useDeepCallback = <T extends Function>(callback: T, dependencies: DependencyList): T => {
    const dependenciesRef = useRef<any>(null);

    if (!isEqual(dependencies, dependenciesRef.current)) {
        dependenciesRef.current = cloneDeep(dependencies);
    }

    return useCallback(callback, [dependenciesRef.current]);
};

export default useDeepCallback;
