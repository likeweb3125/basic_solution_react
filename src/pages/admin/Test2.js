import React,{ useState } from "react";
import {
    SimpleTreeItemWrapper,
    SortableTree,
    TreeItemComponentProps,
    TreeItems,
} from "dnd-kit-sortable-tree";

const TreeItem = React.forwardRef((props, ref) => {
    return (
        <SimpleTreeItemWrapper {...props} ref={ref}>
            <div>{props.item.value}{props.item.id}{props.item.depth}</div>
        </SimpleTreeItemWrapper>
    );
});

const Test2 = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            value: "Jane",
            children: [
                { id: 4, value: "John" },
                { id: 5, value: "Sally" },
            ],
        },
        { id: 2, value: "Fred", children: [{ id: 6, value: "Eugene" }] },
        { id: 3, value: "Helen" },
    ]);

    
    const dndContextProps = {
        onDragEnd: (event) => {
          const { active } = event;
        //   console.log("Active Item Depth:", active.depth);
        },
    };
      

    return(<>
        <SortableTree
            items={items}
            onItemsChanged={setItems}
            TreeItemComponent={TreeItem}
            // dndContextProps={dndContextProps}
            dropAnimation={null}
        />
    </>);
};

export default Test2;