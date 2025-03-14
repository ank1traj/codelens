import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ApiRequest from '@/components/api'
import ToggleSwitch from '@/components/checkbox'
import ButtonGroup from '@/components/buttons'
import InputField from '@/components/inputs'

const BinaryTreeGeneratorModal = ({ isOpen, onClose }) => {
    const initialState = {
        minValue: -100,
        maxValue: 100,
        maxDepth: 0,
        nodeCount: 0,
        isBalanced: false,
        uniqueValues: false,
        errors: {
            minValue: '',
            maxValue: '',
            maxDepth: '',
            nodeCount: '',
            uniqueValues: ''
        },
        treeNodes: [
            { id: 1, parentId: null, value: '', children: [], depth: 1 }
        ],
        nodeErrors: {}
    }

    const [minValue, setMinValue] = useState(initialState.minValue)
    const [maxValue, setMaxValue] = useState(initialState.maxValue)
    const [maxDepth, setMaxDepth] = useState(initialState.maxDepth)
    const [nodeCount, setNodeCount] = useState(initialState.nodeCount)
    const [isBalanced, setIsBalanced] = useState(initialState.isBalanced)
    const [uniqueValues, setUniqueValues] = useState(initialState.uniqueValues)
    const [errors, setErrors] = useState(initialState.errors)
    const [treeNodes, setTreeNodes] = useState(initialState.treeNodes)
    const [nodeErrors, setNodeErrors] = useState(initialState.nodeErrors)

    useEffect(() => {
        if (uniqueValues) {
            const valueMap = {}
            const newErrors = {}

            treeNodes.forEach(node => {
                if (node.value === '') return
                if (valueMap[node.value]) {
                    newErrors[node.id] = 'Value must be unique'
                    valueMap[node.value].push(node.id)
                } else {
                    valueMap[node.value] = [node.id]
                }
            })

            // Mark all duplicates
            Object.values(valueMap).forEach(ids => {
                if (ids.length > 1) {
                    ids.forEach(id => {
                        newErrors[id] = 'Value must be unique'
                    })
                }
            })

            setNodeErrors(newErrors)
        } else {
            setNodeErrors({})
        }
    }, [treeNodes, uniqueValues])

    const validateMinMax = () => {
        const valid = Number(minValue) < Number(maxValue)
        setErrors(prev => ({
            ...prev,
            minValue: valid ? '' : 'Min must be less than Max',
            maxValue: valid ? '' : 'Max must be greater than Min'
        }))
        return valid
    }

    const handleAddChildNode = parentId => {
        if (!validateMinMax()) return

        setTreeNodes(prevNodes => {
            const parentNode = prevNodes.find(node => node.id === parentId)
            if (!parentNode || parentNode.children.length >= 2) return prevNodes

            if (nodeCount > 0 && prevNodes.length >= nodeCount) return prevNodes

            if (maxDepth > 0 && parentNode.depth >= maxDepth) return prevNodes

            const newNodeId = prevNodes.length + 1
            const newNodeDepth = parentNode.depth + 1

            return [
                ...prevNodes.map(node =>
                    node.id === parentId
                        ? { ...node, children: [...node.children, newNodeId] }
                        : node
                ),
                {
                    id: newNodeId,
                    parentId,
                    value: '',
                    children: [],
                    depth: newNodeDepth
                }
            ]
        })
    }

    const handleNodeValueChange = (nodeId, value) => {
        setTreeNodes(prevNodes =>
            prevNodes.map(node =>
                node.id === nodeId ? { ...node, value } : node
            )
        )
    }

    const validateTreeStructure = () => {
        let isValid = true
        const newErrors = { ...initialState.errors }

        // Validate root value
        if (!treeNodes[0].value.trim()) {
            newErrors.rootValue = 'Root value is required'
            isValid = false
        }

        // Validate node values
        const hasInvalidValues = treeNodes.some(node => {
            const numValue = Number(node.value)
            return isNaN(numValue) || numValue < minValue || numValue > maxValue
        })

        if (hasInvalidValues) {
            newErrors.nodeValues = 'All node values must be within range'
            isValid = false
        }

        if (nodeCount > 0 && treeNodes.length > nodeCount) {
            newErrors.nodeCount = `Cannot exceed ${nodeCount} nodes`
            isValid = false
        }

        if (maxDepth > 0) {
            const currentMaxDepth = Math.max(
                ...treeNodes.map(node => node.depth)
            )
            if (currentMaxDepth > maxDepth) {
                newErrors.maxDepth = `Cannot exceed depth ${maxDepth}`
                isValid = false
            }
        }

        setErrors(newErrors)
        return isValid
    }

    const handleGenerate = async () => {
        if (!validateMinMax() || !validateTreeStructure()) return
        if (Object.values(nodeErrors).some(error => error)) return

        const payload = {
            min_value: Number(minValue),
            max_value: Number(maxValue),
            max_depth: Number(maxDepth),
            node_count: Number(nodeCount),
            is_balanced: isBalanced,
            unique_values: uniqueValues,
            tree_structure: treeNodes.map(node => ({
                id: node.id,
                parent_id: node.parentId,
                value: Number(node.value),
                children: node.children,
                depth: node.depth
            }))
        }

        try {
            const response = await ApiRequest(
                'generateBinaryTree',
                'POST',
                payload
            )
            console.log('Generated tree:', response)
            onClose()
        } catch (error) {
            console.error('Generation failed:', error)
        }
    }

    if (!isOpen) return null

    return (
        <div className='modal p-4 bg-white shadow-lg rounded-lg max-w-2xl mx-auto'>
            <h2 className='text-xl font-bold mb-4'>Binary Tree Generator</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6'>
                <InputField
                    label='Min Node Value'
                    type='number'
                    value={minValue}
                    onChange={e => setMinValue(e.target.value)}
                    error={errors.minValue}
                />
                <InputField
                    label='Max Node Value'
                    type='number'
                    value={maxValue}
                    onChange={e => setMaxValue(e.target.value)}
                    error={errors.maxValue}
                />
                <InputField
                    label='Max Depth (0 = unlimited)'
                    type='number'
                    value={maxDepth}
                    onChange={e =>
                        setMaxDepth(Math.max(0, parseInt(e.target.value) || 0))
                    }
                    error={errors.maxDepth}
                />
                <InputField
                    label='Node Count Limit (0 = unlimited)'
                    type='number'
                    value={nodeCount}
                    onChange={e =>
                        setNodeCount(Math.max(0, parseInt(e.target.value) || 0))
                    }
                    error={errors.nodeCount}
                />

                <ToggleSwitch
                    checked={isBalanced}
                    onChange={() => setIsBalanced(!isBalanced)}
                    rightLabel='Balanced Tree'
                />
                <ToggleSwitch
                    checked={uniqueValues}
                    onChange={() => setUniqueValues(!uniqueValues)}
                    rightLabel='Unique Values'
                />
            </div>

            <div className='mb-6'>
                <h3 className='font-semibold mb-2'>
                    Tree Structure ({treeNodes.length} nodes)
                </h3>
                <div className='border rounded p-4'>
                    <ul className='space-y-2'>
                        {treeNodes.map(node => (
                            <li
                                key={node.id}
                                className='flex items-center gap-2'
                            >
                                <span className='w-24'>
                                    {node.parentId === null
                                        ? 'Root'
                                        : `Node ${node.id}`}
                                    <br />
                                    <span className='text-xs'>
                                        (Depth {node.depth})
                                    </span>
                                </span>
                                <input
                                    type='number'
                                    className={`border p-1 w-24 ${
                                        Number(node.value) < minValue ||
                                        Number(node.value) > maxValue ||
                                        nodeErrors[node.id]
                                            ? 'border-red-500'
                                            : ''
                                    }`}
                                    value={node.value}
                                    onChange={e =>
                                        handleNodeValueChange(
                                            node.id,
                                            e.target.value
                                        )
                                    }
                                    placeholder='Value'
                                />
                                {nodeErrors[node.id] && (
                                    <span className='text-red-500 text-sm'>
                                        {nodeErrors[node.id]}
                                    </span>
                                )}
                                {node.children.length < 2 && (
                                    <button
                                        className='px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50'
                                        onClick={() =>
                                            handleAddChildNode(node.id)
                                        }
                                        disabled={
                                            (maxDepth > 0 &&
                                                node.depth >= maxDepth) ||
                                            (nodeCount > 0 &&
                                                treeNodes.length >= nodeCount)
                                        }
                                    >
                                        Add Child
                                    </button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {errors.nodeCount && (
                    <p className='text-red-500 mt-2'>{errors.nodeCount}</p>
                )}
                {errors.maxDepth && (
                    <p className='text-red-500 mt-2'>{errors.maxDepth}</p>
                )}
            </div>

            <div className='flex justify-end gap-2'>
                <button
                    className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    className='px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                    onClick={handleGenerate}
                >
                    Generate
                </button>
            </div>
        </div>
    )
}

BinaryTreeGeneratorModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
}

export default BinaryTreeGeneratorModal
