import { cloneDeep, isEqual } from 'lodash-es';
import { DependencyList, useEffect, useRef } from 'react';

const useDeepEffect = (callback: () => void, dependencies: DependencyList): void => {
    const dependenciesRef = useRef<any>(null);

    if (!isEqual(dependencies, dependenciesRef.current)) {
        dependenciesRef.current = cloneDeep(dependencies);
    }

    return useEffect(callback, [dependenciesRef.current]);
};

export default useDeepEffect;
