import { cloneDeep, isEqual } from 'lodash-es';
import { DependencyList, useMemo, useRef } from 'react';

const useDeepMemo = <T,>(callback: () => T, dependencies: DependencyList): T => {
    const dependenciesRef = useRef<any>(null);

    if (!isEqual(dependencies, dependenciesRef.current)) {
        dependenciesRef.current = cloneDeep(dependencies);
    }

    return useMemo(callback, [dependenciesRef.current]);
};

export default useDeepMemo;
