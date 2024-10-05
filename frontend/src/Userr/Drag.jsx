import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Table from 'react-bootstrap/Table';

const Drag = () => {
    const [data, setData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const id=localStorage.getItem('id')

    const ViewAllTask = async () => {
        try {
            const response = await axios.get(`http://localhost:6500/viewtask/${id}`);
            if (response.data) {
                setData(response.data);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        if (id) {
            ViewAllTask();
        }
    }, [refresh, id]);
    console.log("viewtasksss",data);
    

    // Update task status on backend and local state
    const updateTaskStatus = async (taskId, newStatus) => {
        try {
            await axios.put(`http://localhost:6500/updatetaskstatus/${taskId}`, { status: newStatus });
            setData(prevData => 
                prevData.map(task => 
                    task._id === taskId ? { ...task, status: newStatus } : task
                )
            );  // Update the local state to reflect the new status
            setRefresh(!refresh);  // Refresh the tasks after status change
        } catch (error) {
            console.error('Error updating task status:', error);
        }
    };

    // Handle drag end
    const handleOnDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        if (!destination) return;  // If dropped outside any droppable area, do nothing

        // Only update the status if the column changes
        if (source.droppableId !== destination.droppableId) {
            updateTaskStatus(draggableId, destination.droppableId); // Use destination ID directly
        }
    };

    return (
        <div style={{ marginTop: '100px', padding: '20px' }}>
            <h4 className="text-center" style={{ fontFamily: 'serif' }}><b>All Your Tasks</b></h4>

            {/* Drag and Drop Context */}
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className="row">
                    {/* Pending Tasks */}
                    <div className="col-md-4">
                        <h5>Pending</h5>
                        <Droppable droppableId="Pending">
                            {(provided) => (
                                <Table {...provided.droppableProps} ref={provided.innerRef}>
                                    <tbody>
                                        {data.filter(task => task.status === 'Pending').map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided) => (
                                                    <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <td>{task.title}</td>
                                                        <td>{task.description}</td>
                                                    </tr>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </tbody>
                                </Table>
                            )}
                        </Droppable>
                    </div>

                    {/* In-Progress Tasks */}
                    <div className="col-md-4">
                        <h5>In-Progress</h5>
                        <Droppable droppableId="In-Progress">
                            {(provided) => (
                                <Table {...provided.droppableProps} ref={provided.innerRef}>
                                    <tbody>
                                        {data.filter(task => task.status === 'In-Progress').map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided) => (
                                                    <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <td>{task.title}</td>
                                                        <td>{task.description}</td>
                                                    </tr>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </tbody>
                                </Table>
                            )}
                        </Droppable>
                    </div>

                    {/* Completed Tasks */}
                    <div className="col-md-4">
                        <h5>Completed</h5>
                        <Droppable droppableId="Completed">
                            {(provided) => (
                                <Table {...provided.droppableProps} ref={provided.innerRef}>
                                    <tbody>
                                        {data.filter(task => task.status === 'Completed').map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided) => (
                                                    <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <td>{task.title}</td>
                                                        <td>{task.description}</td>
                                                    </tr>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </tbody>
                                </Table>
                            )}
                        </Droppable>
                    </div>
                </div>
            </DragDropContext>
        </div>

    );
};

export default Drag;  