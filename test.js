function depthFirstIterative(root) {
    let stack = [root]
    let result = []


    while (stack.length) {  // [1, 2]
        let currentNode = stack.pop();

        result.push(currentNode.val)//[0, 2, ]

        if (currentNode.left) {
            stack.push(currentNode.left)
        } else if (currentNode.right) { 
            stack.push(currentNode.right)
        }
    }

    return result
}
