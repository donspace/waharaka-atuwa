export function buildMenuOptions(data, audios) {
    // Stack holds items to process: each with current node, path, and parent list reference
    const stack = [{ node: data, path: [], parentChildren: null }];

    // Root menu items array to return
    const rootItems = [];

    // This will hold flat list of all audio items
    const flatItems = [];

    // Process until the stack is empty
    while (stack.length > 0) {
        const { node, path, parentChildren } = stack.pop();

        // Iterate through current object's entries
        for (const [key, value] of Object.entries(node)) {
            const currentPath = [...path, key];
            const keyStr = currentPath.join(' > ');

            if (Array.isArray(value)) {
                // Leaf node is an array of audio file paths
                const children = [];

                value.forEach((audio, index) => {
                    const itemKey = `${keyStr} > Track ${index + 1}`;
                    const item = {
                        key: itemKey,
                        label: audios[value.toString()].sinhalaCaption,
                        value: value.toString(),
                        audioSrc: audio
                    };
                    flatItems.push(item);
                    children.push({ key: itemKey, label: item.label });
                });

                const group = { key: keyStr, label: key, children };

                if (parentChildren) {
                    parentChildren.push(group);
                } else {
                    rootItems.push(group);
                }

            } else if (typeof value === 'object' && value !== null) {
                // It's a nested object, push it to stack for further processing
                const children = [];
                const group = { key: keyStr, label: key, children };

                if (parentChildren) {
                    parentChildren.push(group);
                } else {
                    rootItems.push(group);
                }

                stack.push({ node: value, path: currentPath, parentChildren: children });
            }
        }
    }

    return { menu: rootItems, rootAudios: flatItems };
}




export function buildMenuOptions2(data, audios) {
    const rootItems = [];
    const flatItems = [];

    function build(node, path = []) {
        const items = [];
        let totalAudioCount = 0;

        for (const [key, value] of Object.entries(node)) {
            const currentPath = [...path, key];
            const keyStr = currentPath.join(' > ');

            if (Array.isArray(value)) {
                const children = [];
                value.forEach((audio, index) => {
                    const audioKey = audio; // This is the correct key for the audios lookup
                    const itemKey = `${keyStr} > Track ${index + 1}`;
                    const label = audios[audioKey]?.sinhalaCaption || `Track ${index + 1}`;
                    const item = {
                        key: itemKey,
                        label,
                        value: audioKey,
                        audioSrc: audio
                    };
                    flatItems.push(item);
                    children.push({ key: itemKey, label });
                });

                items.push({
                    key: keyStr,
                    label: `${key} - ${value.length}`,
                    children
                });

                totalAudioCount += value.length;
            } else if (typeof value === 'object' && value !== null) {
                const result = build(value, currentPath);
                const count = result.count;

                items.push({
                    key: keyStr,
                    label: `${key} - ${count}`,
                    children: result.items
                });

                totalAudioCount += count;
            }
        }

        return { items, count: totalAudioCount };
    }

    const result = build(data);
    return {
        menu: result.items,
        rootAudios: flatItems
    };
}

