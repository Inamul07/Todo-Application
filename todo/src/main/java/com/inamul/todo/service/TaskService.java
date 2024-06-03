package com.inamul.todo.service;

import com.inamul.todo.model.Task;
import com.inamul.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    public Task getTask(int taskId) {
        Optional<Task> task = taskRepository.findById(taskId);
        return task.orElse(null);
    }

    public void saveTask(Task task) {
        taskRepository.save(task);
    }

    private void sortByDueDate(List<Task> tasks) {
        tasks.sort((task1, task2) -> {
            return task1.parsedDate().compareTo(task2.parsedDate());
        });
    }

    private void sortByPriority(List<Task> tasks) {
        Map<String, Integer> order = new HashMap<>();
        order.put("Low", 1);
        order.put("Medium", 2);
        order.put("High", 3);

        tasks.sort((task1, task2) -> {
            return order.get(task1.getPriority()).compareTo(order.get(task2.getPriority()));
        });
    }

    private void sortByPriorityDesc(List<Task> tasks) {
        sortByPriority(tasks);
        Collections.reverse(tasks);
    }

    private List<Task> filterTasks(List<Task> tasks, String filterType) {
        List<Task> filteredTasks = new ArrayList<>();

        LocalDate today = LocalDate.now();
        for(Task task: tasks) {
            LocalDate date = LocalDate.parse(task.getDueDate(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
            if(filterType.equals("PastDue") && date.isBefore(today)) {
                filteredTasks.add(task);
            } else if(filterType.equals("DueToday") && date.isEqual(today)) {
                filteredTasks.add(task);
            }
        }
        return filteredTasks;
    }

    public List<Task> getTasksWithUserId(int userId, String sortType, String filterType) {
        List<Task> tasks = taskRepository.findByUserUserId(userId);

        if(sortType.equals("DueDate")) {
            sortByDueDate(tasks);
        } else if(sortType.equals("PriorityLowToHigh")) {
            sortByPriority(tasks);
        } else {
            sortByPriorityDesc(tasks);
        }

        if(!filterType.equals("None")) {
            tasks = filterTasks(tasks, filterType);
        }

        return tasks;
    }

    public void deleteTask(int taskId) {
        taskRepository.deleteById(taskId);
    }

}
