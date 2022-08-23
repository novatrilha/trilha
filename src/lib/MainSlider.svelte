<script lang="ts">
	import ChevronLeftIcon from "../assets/chevron-left.svg";
	import ChevronRightIcon from "../assets/chevron-right.svg";

	const steps = [
		"Você sabia que a PB só tem XX de deputados negros?",
		"Sample 1",
		"Sample 2",
	];
	$: currentStep = steps[0];

	const nextStep = () => {
		let index = steps.indexOf(currentStep) + 1;
		if (index === steps.length) index = 0;
		currentStep = steps[index];
	};

	const prevStep = () => {
		let index = steps.indexOf(currentStep) - 1;
		if (index === -1) index = steps.length - 1;
		currentStep = steps[index];
	};
</script>

<section>
	<div class="content-container">
		<img class="clickable" src={ChevronLeftIcon} on:click={prevStep} />
		<div class="text">{currentStep}</div>
		<img class="clickable" src={ChevronRightIcon} on:click={nextStep} />
	</div>

	<div class="steps-container">
		{#each steps as step}
			<div
				class="step"
				class:selected={step === currentStep}
				on:click={() => (currentStep = step)}
			/>
		{/each}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3em;
	}

	.content-container {
		display: flex;
		justify-content: space-between;
		width: 80em;
	}

	.text {
		display: flex;
		align-items: center;
		max-width: 90%;
		height: 3.5em;
		font-size: 6em;
		font-weight: 700;
		text-align: center;
		line-height: 1.2em;
	}

	.steps-container {
		display: flex;
		gap: 14px;
	}

	.step {
		width: 1.375em;
		height: 1.375em;
		border-radius: 50%;
		border: 2px solid var(--gray);
	}

	.step.selected {
		border-color: var(--red);
		background: var(--red);
	}
</style>
