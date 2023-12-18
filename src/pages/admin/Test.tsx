import React, { useEffect, useState } from "react";
import {
    SimpleTreeItemWrapper,
    SortableTree,
    TreeItemComponentProps,
    TreeItems,
} from "dnd-kit-sortable-tree";

export default function Test() {
    const [items, setItems] = useState(initialViableMinimalData);


    const dndContextProps = {
        onDragEnd: (event: any) => {
            const { active, over } = event;
      
            console.log(active);
            console.log(over);
        },
    };

    useEffect(()=>{
        // if(){

        // }
    },[items]);
      


    return (
        <SortableTree
            items={items}
            onItemsChanged={setItems}
            TreeItemComponent={TreeItem}
            // dndContextProps={dndContextProps}
            dropAnimation={null}
        />
    );
}

type MinimalTreeItemData = {
    value: string;
    depth?: number | undefined;
};
/*
 * Here's the component that will render a single row of your tree
 */
const TreeItem = React.forwardRef<
    HTMLDivElement,
    TreeItemComponentProps<MinimalTreeItemData>
>((props, ref) => {
    const [sample, setSample] = useState("");
    return (
        <SimpleTreeItemWrapper {...props} ref={ref} >
            <div>{props.item.value}</div>
            <input
                value={sample}
                onChange={(e) => {
                    setSample(e.target.value);
                }}
            ></input>
        </SimpleTreeItemWrapper>
    );
});
/*
 * Configure the tree data.
 */
const initialViableMinimalData: TreeItems<MinimalTreeItemData> = [
    {
      id: '1',
      value: 'Jane',
      children: [
        { id: '4', value: 'John' },
        { id: '5', value: 'Sally' },
      ],
    },
    { id: '2', value: 'Fred', children: [{ id: '6', value: 'Eugene' }] },
    { id: '3', value: 'Helen', canHaveChildren: false },
  ];
