<script lang="ts">
	import '../app.css';

	import { fade } from 'svelte/transition';

	import Button from '@smui/button';
	import Card from '@smui/card';
	import Textfield from '@smui/textfield';
	import HelperText from '@smui/textfield/helper-text';
	import List, { Item, Separator, Text } from '@smui/list';
	import Select, { Option } from '@smui/select';
	import { Icon, Label } from '@smui/common';
	import Fab from '@smui/fab';

	import { priorities, sortedTodoList, todoList as todoListStore } from './stores';
	import type { TodoItem } from './stores';
	import { onDestroy } from 'svelte';

	let title = '';
	let priority = priorities[1];

	$: disabledCreateButton = title === '';

	const handleClickCreateButton = () => {
		if (typeof priorities.find((p) => p.value === priority.value) !== 'undefined') {
			todoListStore.addItem(title, priority);
		}
		title = '';
	};
</script>

<div class="p-4 h-full">
	<Card class="h-full grid justify-items-center" variant="outlined" padded>
		<div class="w-1/2">
			<div class="grid justify-items-center pb-6">
				<p class="text-xl font-bold underline">TODO アプリ</p>
				<div class="w-full pb-6">
					<div class="w-full p-4">
						<Textfield class="w-full" bind:value={title} label="タイトル" />
					</div>
					<div class="w-full p-4">
						<Select
							class="w-full"
							bind:value={priority}
							label="優先度"
							key={(priority) => `${(priority && priority.value) || ''}`}
						>
							{#each priorities as priority (priority.label)}
								<Option value={priority}>{priority.label}</Option>
							{/each}
						</Select>
					</div>
				</div>
				<div class="w-1/3">
					<Button
						class="w-full"
						variant="raised"
						disabled={disabledCreateButton}
						on:click={handleClickCreateButton}
					>
						<Label>作成</Label>
					</Button>
				</div>
			</div>

			<div class="grid justify-items-center">
				{#if $todoListStore.length === 0}
					<div class="text-xl text-center">アイテムを作成してください</div>
				{:else}
					<div>件数：{$todoListStore.length}</div>
					<List class="w-full">
						<Separator />
						{#each $sortedTodoList as todoItem (todoItem.id)}
							<Item>
								<div class="w-full" transition:fade>
									<Fab
										mini
										class="{todoItem.priority.value === 1
											? 'bg-red-500'
											: todoItem.priority.value === 2
											? 'bg-yellow-500'
											: 'bg-green-500'} mr-2"
									>
										<Label>{todoItem.priority.label}</Label>
									</Fab>
									<Text>{todoItem.title}</Text>
									<Button
										class="float-right"
										variant="raised"
										on:click={() => todoListStore.completeItem(todoItem.id)}>x</Button
									>
								</div>
							</Item>
							<Separator />
						{/each}
					</List>
				{/if}
			</div>
		</div>
	</Card>
</div>
